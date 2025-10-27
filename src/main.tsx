import { createRoot } from "react-dom/client";
//@ts-ignore
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home/Home.tsx";
import ViewArticle from "./pages/ViewArticle/ViewArticle.tsx";
import BasePage from "./pages/BasePage/BasePage.tsx";
import ViewTopic from "./pages/ViewTopic/ViewTopic.tsx";
import CreateArticle from "./pages/CreateArticle/CreateArticle.tsx";
import SearchResults from "./pages/SearchResults/SearchResults.tsx";
import Bookmarks from "./pages/Bookmarks/Bookmarks.tsx";
import articleFactory from "./factories/article-factory.ts";
import topicFactory from "./factories/topic-factory.ts";

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
            loader: async ({ params }) => {
              if (params.topicId) {
                const topic = await topicFactory.getTopic({
                  topicId: params.topicId,
                });
                return topic;
              }
            },
            Component: ViewTopic,
          },
          {
            path: "/topic/:topicId/article/:articleId/:articleName?",
            loader: async ({ params }) => {
              if (params.articleId) {
                return await articleFactory.getArticle({
                  articleId: params.articleId,
                  topicId: params.topicId,
                });
              }
            },
            Component: ViewArticle,
          },
        ],
      },
      {
        path: "/create",
        Component: CreateArticle,
      },
      {
        path: "/search",
        Component: SearchResults,
      },
      { path: "/bookmarks", Component: Bookmarks },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
