import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home/Home.tsx";
import ViewArticle from "./pages/ViewArticle/ViewArticle.tsx";
import BasePage from "./pages/BasePage/BasePage.tsx";
import ViewTopic from "./pages/ViewTopic/ViewTopic.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: BasePage,
    children: [
      { index: true, Component: Home },
      {
        path: "/topic/:topicName",
        children: [
          {
            index: true,
            Component: ViewTopic,
          },
          {
            path: "/topic/:topicName/article/:articleId/:articleName?",
            Component: ViewArticle,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
