import { Route, Routes } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/views/Home";
import Blog from "@/views/Blog";
import Game from "@/views/Game";
import Resume from "@/views/Resume";
import Error from "@/views/Error";
import BlogList from "@/views/BlogList";
import BlogDetail from "@/views/BlogDetail";
// import EditorLayout from "@/layouts/EditorLayout.tsx";

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
      {/*<Route path="/editor" element={<EditorLayout />} />*/}
      {/* 404页面使用错误布局 */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
