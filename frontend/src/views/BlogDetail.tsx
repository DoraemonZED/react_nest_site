import { Button } from "@heroui/react";
import { useNavigate, useParams } from "react-router-dom";
import {useCallback, useEffect, useRef} from "react";
import { blogService } from "@/services/blogService.ts";
import { imageService } from "../services/imageService";
import Vditor from "vditor";
import {debounce} from "lodash";

interface UploadResult {
  data: Array<{
    url: string;
    alt?: string;
  }>;
}

export default function BlogDetail(){
  const navigate = useNavigate();
  const { listId } = useParams<{ listId: string }>();
  const renderDivDom = useRef<HTMLDivElement>(null);
  const vditorRef = useRef<Vditor>();
  let blogContent = ''
  const previousContentRef = useRef<string>(blogContent);
  if (!listId) {return null}
  useEffect(() => {
    getData()
  }, [listId]);
  const getData = async () => {
    const data = await blogService.getBlogInfo(listId)
    blogContent = data.content
    await Vditor.preview(renderDivDom.current as HTMLDivElement, data.content, {
      mode: "light",
      cdn: '/vditor',
      theme: { current: 'wechat', path: '/vditor/dist/css/content-theme' },
      hljs: { style: 'github' }
    })
  }
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
  const debouncedContentChange = useCallback(
    debounce((newContent: string) => {
      const oldContent = previousContentRef.current;
      checkDeletedImages(newContent, oldContent);
      previousContentRef.current = newContent;
    }, 500),
    [checkDeletedImages]
  );
  const editBlog = () => {
    const vditor = new Vditor(renderDivDom.current as HTMLDivElement, {
      height: '100%',
      mode: "wysiwyg",
      theme: "classic",
      cdn: '/vditor',
      preview: {
        theme: { current: 'wechat', path: '/vditor/dist/css/content-theme' },
        hljs: { style: 'github' }
      },
      cache: {
        enable: false
      },
      upload: {
        url: '/api/images/upload',
        success: (_: HTMLElement, result: string) => {
          try {
            const response = JSON.parse(result) as UploadResult;
            const {url} = response.data[0];
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
        debouncedContentChange(processedText);
      },
      toolbar: ["emoji", "headings", "bold", "italic", "strike", "link", "|", "list", "ordered-list", "check", "outdent", "indent", "|", "quote", "line", "code", "inline-code", "insert-before", "insert-after", "|", "upload", "table", "|", "undo", "redo", "|", "fullscreen", "preview"],
      after: () => {
        if (blogContent) {
          vditor.setValue(blogContent);
        }
        vditorRef.current = vditor;
        previousContentRef.current = blogContent;
      }
    })
  }
  const changeToPreview = () => {
    console.log(vditorRef.current)
    vditorRef.current && vditorRef.current.renderPreview()
  }
  return (
      <div className="bg-blue-100">
        <Button onPress={() => navigate(-1)}>返回</Button>
        <Button onPress={() => editBlog()}>编辑</Button>
        <Button onPress={() => changeToPreview()}>test</Button>
        <div className="max-w-[800px] mx-auto">
          <div ref={renderDivDom}></div>
        </div>
      </div>
  )
}