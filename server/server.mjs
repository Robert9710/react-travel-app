import express from "express";
import serverless from "serverless-http";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import topicFactory from "./factories/topic-factory.mjs";
import articleFactory from "./factories/article-factory.mjs";
import searchFactory from "./factories/search-factory.mjs";
import userFactory from "./factories/user-factory.mjs";
import tokenFactory from "./factories/token-factory.mjs";
import { requestHandler, errorHandler } from "./utils.mjs";

const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? "https://voyzaa.netlify.app"
    : "http://localhost:5173";
var corsOptions = {
  origin: allowedOrigin,
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(tokenFactory.authenticateToken);

app.get(
  "/topic/:topicId/article/:articleId/related",
  requestHandler(async (req, res) => {
    res.json(
      await articleFactory.getRelatedArticles({
        articleId: req.params.articleId,
        topicId: req.params.topicId,
        pagenum: req.query.pagenum,
        pagesize: req.query.pagesize,
        userId: req.user.userId,
      }),
    );
  }),
);

app.get(
  "/topic/{:topicId}/article/:articleId",
  requestHandler(async (req, res) => {
    res.json(
      await articleFactory.getArticle({
        articleId: req.params.articleId,
        topicId: req.params.topicId,
        userId: req.user.userId,
      }),
    );
  }),
);

app.get(
  "/topic/:topicId/articles",
  requestHandler(async (req, res) => {
    res.json(
      await articleFactory.getArticlesInTopic({
        topicId: req.params.topicId,
        pagenum: req.query.pagenum,
        pagesize: req.query.pagesize,
        userId: req.user.userId,
      }),
    );
  }),
);

app.get(
  "/topic/:topicId",
  requestHandler(async (req, res) => {
    res.json(
      await topicFactory.getTopic({
        topicId: req.params.topicId,
        userId: req.user.userId,
      }),
    );
  }),
);

app.get(
  "/topics",
  requestHandler(async (req, res) => {
    res.status(200).json(
      await topicFactory.getTopics({
        pagenum: req.query.pagenum,
        pagesize: req.query.pagesize,
        userId: req.user.userId,
      }),
    );
  }),
);

app.post(
  "/article",
  requestHandler(async (req, res) => {
    await articleFactory.createArticle({
      topicId: req.body.topicId,
      name: req.body.name,
      content: req.body.content,
      recommendedMonths: req.body.recommendedMonths,
      userId: req.user.userId,
    });
    res.sendStatus(204);
  }),
);

app.post(
  "/topic",
  requestHandler(async (req, res) => {
    await topicFactory.createTopic({
      topicName: req.body.topicName,
      userId: req.user.userId,
    });
    res.sendStatus(204);
  }),
);

app.get(
  "/search/suggestions",
  requestHandler(async (req, res) => {
    res.json(
      await searchFactory.search({
        query: req.query.query,
        maxCount: req.query.maxCount,
        userId: req.user.userId,
      }),
    );
  }),
);

app.get(
  "/search",
  requestHandler(async (req, res) => {
    res.json(
      await searchFactory.search({
        query: req.query.query,
        pagenum: req.query.pagenum,
        pagesize: req.query.pagesize,
        userId: req.user.userId,
      }),
    );
  }),
);

app.post(
  "/register",
  requestHandler(async (req, res) => {
    res
      .json(
        await userFactory.registerUser({
          username: req.body.username,
          password: req.body.password,
        }),
      )
      .status(204);
  }),
);

app.post(
  "/login",
  requestHandler(async (req, res) => {
    const response = await userFactory.login({
      username: req.body.username,
      password: req.body.password,
    });
    res
      .cookie("access_token", response.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .cookie("refresh_token", response.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .cookie("csrf_token", response.csrfToken, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        username: response.username,
      });
  }),
);

app.post(
  "/logout",
  requestHandler((req, res) => {
    res
      .clearCookie("access_token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .clearCookie("refresh_token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .clearCookie("csrf_token", {
        httpOnly: false,
        secure: true,
        sameSite: "none",
      })
      .sendStatus(204);
  }),
);

app.post(
  "/token",
  requestHandler(async (req, res) => {
    const token = tokenFactory.generateAccessToken({
      refreshToken: req.cookies.refresh_token,
    });
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .sendStatus(204);
  }),
);

//The following code has to stay after all routes
app.use(errorHandler);

export const handler = serverless(app);

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
  app.listen(3000);
}

// function processResponse(response, res) {
//   if (response.statusCode) {
//     res.status(response.statusCode).json(response.error);
//   } else {
//     res.json(response);
//   }
// }
