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

app.get("/topic/:topicId/article/:articleId/related", async (req, res) => {
  res.json(
    await articleFactory.getRelatedArticles({
      articleId: req.params.articleId,
      topicId: req.params.topicId,
      pagenum: req.query.pagenum,
      pagesize: req.query.pagesize,
    })
  );
});

app.get("/topic/{:topicId}/article/:articleId", async (req, res) => {
  res.json(
    await articleFactory.getArticle({
      articleId: req.params.articleId,
      topicId: req.params.topicId,
    })
  );
});

app.get("/topic/:topicId/articles", async (req, res) => {
  res.json(
    await articleFactory.getArticlesInTopic({
      topicId: req.params.topicId,
      pagenum: req.query.pagenum,
      pagesize: req.query.pagesize,
    })
  );
});

app.get("/topic/:topicId", async (req, res) => {
  res.json(await topicFactory.getTopic({ topicId: req.params.topicId }));
});

app.get("/topics", async (req, res) => {
  res.json(
    await topicFactory.getTopics({
      pagenum: req.query.pagenum,
      pagesize: req.query.pagesize,
    })
  );
});

app.post("/article", (req, res) => {
  const articleCreatedSuccessfully = articleFactory.createArticle({
    topicId: req.body.topicId,
    name: req.body.name,
    content: req.body.content,
    recommendedMonths: req.body.recommendedMonths,
  });
  if (articleCreatedSuccessfully) {
    res.status(204).send();
  } else {
    res.status(400).send();
  }
});

app.post("/topic", (req, res) => {
  const topicCreatedSuccessfully = topicFactory.createTopic({
    topicName: req.body.topicName,
  });
  if (topicCreatedSuccessfully) {
    res.status(204).send();
  } else {
    res.status(400).send();
  }
});

app.get("/search/suggestions", (req, res) => {
  res.json(
    searchFactory.search({
      query: req.query.q,
      maxCount: req.query.maxCount,
    })
  );
});

app.get("/search", (req, res) => {
  res.json(
    searchFactory.search({
      query: req.query.q,
      pagenum: req.query.pagenum,
      pagesize: req.query.pagesize,
    })
  );
});

app.post("/register", async (req, res) => {
  res.status(204).json(
    await userFactory.registerUser({
      username: req.body.username,
      password: req.body.password,
    })
  );
});

app.post("/login", async (req, res) => {
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
});

app.post("/logout", (req, res) => {
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
});

app.post("/token", async (req, res) => {
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
});

export const handler = serverless(app);

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
  app.listen(3000);
}
