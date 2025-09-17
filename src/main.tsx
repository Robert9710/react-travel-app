import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home/Home.tsx";
import ViewArticle from "./pages/ViewArticle/ViewArticle.tsx";
import BasePage from "./pages/BasePage/BasePage.tsx";
import ViewTopic from "./pages/ViewTopic/ViewTopic.tsx";
import CreateArticle from "./pages/CreateArticle/CreateArticle.tsx";
import SearchResults from "./pages/SearchResults/SearchResults.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: BasePage,
    children: [
      { index: true, Component: Home },
      {
        path: "/topic/:topicId",
        children: [
          {
            index: true,
            Component: ViewTopic,
          },
          {
            path: "/topic/:topicId/article/:articleId/:articleName?",
            Component: ViewArticle,
          },
        ],
      },
      {
        path: "/create",
        Component: CreateArticle,
      },
      { path: "/search", Component: SearchResults },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
