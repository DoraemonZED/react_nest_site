import { Route, Routes } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import Game from "@/pages/Game";
import Resume from "@/pages/Resume";
import Error from "@/pages/Error";
import BlogList from "@/pages/BlogList";
import BlogDetail from "@/pages/BlogDetail";
import EditorLayout from "@/layouts/EditorLayout.tsx";

function App() {
  return (
    <Routes>
      {/* 使用默认布局的路由组 */}
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} >
          <Route path=":menuId" element={<BlogList />} />
          <Route path=":menuId/:listId" element={<BlogDetail />} />
        </Route>
        <Route path="/game" element={<Game />} />
        <Route path="/resume" element={<Resume />} />
      </Route>
      {/* 编辑页面 */}
      <Route path="/editor" element={<EditorLayout />} />
      {/* 404页面使用错误布局 */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
