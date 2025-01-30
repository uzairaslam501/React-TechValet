import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RoleBasedRoute from "../../utils/authorized/RoleBasedRoute";
import SeoDashboard from "../../pages/SEO/Dashboard/Dashboard";
import AddArticle from "../../pages/SEO/Articles/AddArticle";
import ArticleList from "../../pages/SEO/Articles/List";
import AddSkillContent from "../../pages/SEO/Content/AddSkillContent";
import SkillContentList from "../../pages/SEO/Content/List";

const createRoute = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RoleBasedRoute allowedRoles={["Seo"]} />}>
        {/* SEO Team */}
        <Route path="/panel" element={<SeoDashboard />} />
        {/* Blogs */}
        <Route path="/add-blog" element={<AddArticle />} />
        <Route path="/blog-list" element={<ArticleList />} />
        {/* Skill Content */}
        <Route path="/add-content" element={<AddSkillContent />} />
        <Route path="/content-list" element={<SkillContentList />} />
      </Route>
    </>
  )
);

function SeoRoutes() {
  return (
    <>
      <RouterProvider router={createRoute} />
    </>
  );
}

export default SeoRoutes;
