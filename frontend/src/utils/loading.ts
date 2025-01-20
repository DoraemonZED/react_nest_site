import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Loading } from '@/components/Loading';

interface LoadingInstance {
  text?: string;
  update: (text: string) => void;
  close: () => void;
}

class LoadingManager {
  private container: HTMLDivElement | null = null;
  private root: ReturnType<typeof createRoot> | null = null;
  private visible = false;
  private text = '';
  private loadingCount = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
      this.root = createRoot(this.container);
    }
  }

  private render() {
    if (!this.root) return;
    this.root.render(
      createElement(Loading, {
        visible: this.visible,
        text: this.text
      })
    );
  }

  open(text = ''): LoadingInstance {
    this.loadingCount++;
    if (!this.visible) {
      this.visible = true;
      this.text = text;
      this.render();
    }

    return {
      text: this.text,
      update: (newText: string) => {
        this.text = newText;
        this.render();
      },
      close: () => {
        this.loadingCount--;
        if (this.loadingCount === 0) {
          this.visible = false;
          this.text = '';
          this.render();
        }
      }
    };
  }
}

export const loading = new LoadingManager(); 