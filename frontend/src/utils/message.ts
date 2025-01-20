import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { nanoid } from 'nanoid';
import { Message } from '@/components/Message';
import { AnimatePresence } from 'framer-motion';

type MessageType = 'primary' | 'success' | 'warning' | 'danger';

interface MessageInstance {
  id: string;
  type: MessageType;
  content: string;
  timer?: NodeJS.Timeout;
}

class MessageManager {
  private container: HTMLDivElement | null = null;
  private root: ReturnType<typeof createRoot> | null = null;
  private messages: MessageInstance[] = [];
  private readonly MAX_COUNT = 5;
  private readonly DURATION = 5000;

  constructor() {
    if (typeof window !== 'undefined') {
      this.container = document.createElement('div');
      this.container.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-[999] flex flex-col gap-2';
      document.body.appendChild(this.container);
      this.root = createRoot(this.container);
    }
  }

  private addMessage(message: MessageInstance) {
    this.messages.push(message);
    if (this.messages.length > this.MAX_COUNT) {
      const oldestMessage = this.messages.shift();
      if (oldestMessage?.timer) {
        clearTimeout(oldestMessage.timer);
      }
    }
    
    message.timer = setTimeout(() => {
      this.removeMessage(message.id);
    }, this.DURATION);

    this.render();
  }

  private removeMessage(id: string) {
    const message = this.messages.find(msg => msg.id === id);
    if (message?.timer) {
      clearTimeout(message.timer);
    }
    this.messages = this.messages.filter(msg => msg.id !== id);
    this.render();
  }

  private handleMouseEnter = (id: string) => {
    const message = this.messages.find(msg => msg.id === id);
    if (message?.timer) {
      clearTimeout(message.timer);
    }
  }

  private handleMouseLeave = (id: string) => {
    const message = this.messages.find(msg => msg.id === id);
    if (message) {
      message.timer = setTimeout(() => {
        this.removeMessage(message.id);
      }, this.DURATION);
    }
  }

  private render() {
    if (!this.root) return;
    
    this.root.render(
      createElement(AnimatePresence, { mode: "popLayout" }, 
        this.messages.map((msg, index) => 
          createElement(Message, {
            key: msg.id,
            ...msg,
            onCloseAction: () => this.removeMessage(msg.id),
            onMouseEnter: () => this.handleMouseEnter(msg.id),
            onMouseLeave: () => this.handleMouseLeave(msg.id),
            index
          })
        )
      )
    );
  }

  show(content: string, type: MessageType = 'primary') {
    const id = nanoid();
    this.addMessage({ id, content, type });
    
    return {
      close: () => this.removeMessage(id)
    };
  }

  success(content: string) {
    return this.show(content, 'success');
  }

  warning(content: string) {
    return this.show(content, 'warning');
  }

  error(content: string) {
    return this.show(content, 'danger');
  }
}

export const message = new MessageManager(); 