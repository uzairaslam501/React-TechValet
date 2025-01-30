import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Welcome from "../../pages/Client/Welcome/welcome";
import About from "../../pages/Client/About/about";
import Contact from "../../pages/Client/Contact/contact";
import SkillArticle from "../../pages/SEO/Content/Grid/SkillArticle";
import SkillProfiles from "../../pages/SEO/Content/Single/SkillProfiles";
import PublicArticles from "../../pages/SEO/Articles/ArticleGrid/PublicArticles";
import ArticleDetail from "../../pages/SEO/Articles/Single/ArticleDetail";
import PreviewProfile from "../../pages/Client/Preview";
import PrivacyPolicy from "../../pages/Policies/PrivacyPolicy/privacy";
import TermsAndConditions from "../../pages/Policies/TermsAndCondition/TermsAndCondition";

const createRoute = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicRoot />}>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/skills" element={<SkillArticle />} />
        <Route path="/skill/:skill" element={<SkillProfiles />} />
        <Route path="/blogs" element={<PublicArticles />} />
        <Route path="/:slug" element={<ArticleDetail />} />
        <Route path="/preview-profile/:id" element={<PreviewProfile />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Route>
    </>
  )
);

function PublicRoutes() {
  return (
    <>
      <RouterProvider router={createRoute} />
    </>
  );
}

export default PublicRoutes;
