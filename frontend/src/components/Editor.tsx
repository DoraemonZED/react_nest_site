import {useEffect} from "react";
import Vditor from "vditor";

export function Editor() {
  useEffect(() => {
    const vditor = new Vditor("vditorContainer", {
      cdn: '/vditor',
      after: () => {
        vditor.enableCache()
      },
      preview: {
        theme: {
          current: 'light',
          path: '/vditor/dist/css/content-theme'
        }
      },
      cache: {
        id: 'vditorCache',
        enable: true
      },
      minHeight: 500,
      width: 1200,
      height: '100vh',
      placeholder: '请输入.....',
      outline: {
        enable: true,
        position: 'left'
      },
      hint: {
        emojiTail: "选择表情",
        emojiPath: "/vditor/dist/images/emoji",
        emoji: {
          "sad": "👎",
          "dog": "/vditor/dist/images/emoji/doge.png"
        }
      },
      toolbar: [
        // "emoji",
        "upload",
        {
          name: '删除图片',
        },
        {
          name: '远程图片地址'
        },
        {
          // hotkey: '',
          // name: 'sponsor',
          // tipPosition: 's',
          // tip: '成为赞助者',
          // className: 'right',
          // icon: '',
          // click () {
          //   console.log(vditor, vditor.getValue());
          // },
        }
      ],
      upload: {
        fieldName: 'files', // 上传文件的文件名
        multiple: true, // 是否允许多个上传
        accept: 'image/*',
        handler(files) {
          let form = new FormData()
          files.forEach(item => {
            form.append('files', item)
          })
          form.append('fileName', '/app/')
          return uploadImg(form).then(res => {
            if (res.code === 200) {
              let resKey = Object.keys(res.data.succMap)
              for (let i of resKey) {
                vditor.insertValue(`![${i}](http://localhost:8910/static/${encodeURI(res.data.succMap[i])})`)
              }
            }
          })
        },
      },
      mode: "ir"
    });
  }, [])
  return (
    <>
      <div id='vditorContainer' className="w-full min-h-96"></div>
    </>
  )
}