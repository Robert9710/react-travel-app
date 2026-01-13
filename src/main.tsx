import { createRoot } from "react-dom/client";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home/Home.tsx";
import ViewArticle from "./pages/ViewArticle/ViewArticle.tsx";
import BasePage from "./pages/BasePage/BasePage.tsx";
import ViewTopic from "./pages/ViewTopic/ViewTopic.tsx";
import CreateArticle from "./pages/CreateArticle/CreateArticle.tsx";
import SearchResults from "./pages/SearchResults/SearchResults.tsx";
import Bookmarks from "./pages/Bookmarks/Bookmarks.tsx";
import Register from "./pages/Register/Register.tsx";
import Login from "./pages/Login/Login.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import httpService from "./services/http-service.ts";

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
      {
        path: "/search",
        Component: SearchResults,
      },
      { path: "/bookmarks", Component: Bookmarks },
      { path: "/register", Component: Register },
      { path: "/login", Component: Login },
    ],
  },
]);

const queryClient = new QueryClient();

httpService.getToken().then(() => {
  createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
});
