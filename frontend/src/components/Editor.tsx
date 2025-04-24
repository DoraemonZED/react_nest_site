import { useEffect, useRef, useCallback } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";
import { imageService } from "../services/imageService";

interface EditorProps {
  value?: string;
  onChange?: (value: string) => void;
  height?: string;
  placeholder?: string;
  articleId?: string;
}

interface UploadResult {
  data: Array<{
    url: string;
    alt?: string;
  }>;
}

export function Editor({ 
  value = "", 
  onChange, 
  height = "100vh",
  placeholder = "Please enter content...",
  articleId
}: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const vditorRef = useRef<Vditor>();
  const previousContentRef = useRef<string>(value);

  // 处理图片URL的粘贴和输入
  const handleImageUrl = useCallback(async (text: string) => {
    const imgRegex = /!\[.*?]\((http[s]?:\/\/.*?)\)/g;
    let match;
    let newText = text;
    
    while ((match = imgRegex.exec(text)) !== null) {
      try {
        const imageUrl = match[1];
        const { url } = await imageService.downloadFromUrl(imageUrl);
        newText = newText.replace(imageUrl, url);
      } catch (error) {
        console.error('Failed to download image:', error);
      }
    }
    
    return newText;
  }, []);

  // 检测删除的图片
  const checkDeletedImages = useCallback((newContent: string, oldContent: string) => {
    const getImageUrls = (content: string) => {
      const regex = /!\[.*?]\((.*?)\)/g;
      const urls = new Set<string>();
      let match;
      while ((match = regex.exec(content)) !== null) {
        urls.add(match[1]);
      }
      return urls;
    };

    const oldUrls = getImageUrls(oldContent);
    const newUrls = getImageUrls(newContent);

    // 找出在旧内容中存在但在新内容中不存在的图片URL
    oldUrls.forEach(url => {
      if (!newUrls.has(url)) {
        const filename = url.split('/').pop();
        if (filename) {
          imageService.deleteImage(filename).catch(console.error);
        }
      }
    });
  }, []);

  // 防抖处理内容变化
  // const debouncedContentChange = useCallback(
  //   debounce((newContent: string) => {
  //     const oldContent = previousContentRef.current;
  //     checkDeletedImages(newContent, oldContent);
  //     previousContentRef.current = newContent;
  //     onChange?.(newContent);
  //   }, 500),
  //   [onChange, checkDeletedImages]
  // );

  useEffect(() => {
    const element = editorRef.current;
    if (!element || vditorRef.current) return;

    const vditor = new Vditor(element, {
      height,
      mode: "wysiwyg",
      placeholder,
      theme: "classic",
      cache: {
        enable: false
      },
      upload: {
        url: '/api/images/upload',
        success: (_: HTMLElement, result: string) => {
          try {
            const response = JSON.parse(result) as UploadResult;
            const { url } = response.data[0];
            // 在光标处插入图片
            vditor.insertValue(`![image](${url})`);
          } catch (error) {
            console.error('Failed to parse upload response:', error);
          }
        }
      },
      input: async (text) => {
        // 处理图片URL
        const processedText = await handleImageUrl(text);
        if (processedText !== text && vditorRef.current) {
          vditorRef.current.setValue(processedText);
          return;
        }
        // debouncesdContentChange(processedText);
      },
      toolbar: [
        "emoji",
        "headings",
        "bold",
        "italic",
        "strike",
        "link",
        "|",
        "list",
        "ordered-list",
        "check",
        "outdent",
        "indent",
        "|",
        "quote",
        "line",
        "code",
        "inline-code",
        "insert-before",
        "insert-after",
        "|",
        "upload",
        "table",
        "|",
        "undo",
        "redo",
        "|",
        "fullscreen",
        "preview"
      ],
      after: () => {
        if (value) {
          vditor.setValue(value);
        }
        vditorRef.current = vditor;
        previousContentRef.current = value;
      }
    });

    return () => {
      // debouncedContentChange.cancel();
      if (vditorRef.current) {
        vditorRef.current.destroy();
        vditorRef.current = undefined;
      }
    };
  }, [height, placeholder, handleImageUrl, value]);

  // 提供验证图片的方法
  const validateImages = useCallback(async () => {
    if (vditorRef.current && articleId) {
      const content = vditorRef.current.getValue();
      await imageService.validateAndCleanImages(content, articleId);
    }
  }, [articleId]);

  return (
    <div 
      ref={editorRef} 
      style={{ width: '100%', height: '100vh' }}
      className="w-full h-full"
    />
  );
}