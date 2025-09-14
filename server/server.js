// express, nodemon, fs, cors
import express from "express";
import cors from "cors";
import { resolve } from "path";
import { init } from "./utils.js";
import topicFactory from "./factories/topic-factory.js";
import articleFactory from "./factories/article-factory.js";
import searchFactory from "./factories/search-factory.js";

export let [topics] = await init();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/topic/:topicId/article/:articleId/related", async (req, res) => {
  res.json(
    articleFactory.getRelatedArticles(req.params.articleId, req.params.topicId)
  );
});

app.get("/topic/:topicId/article/:articleId", (req, res) => {
  res.json(articleFactory.getArticle(req.params.articleId, req.params.topicId));
});

app.get("/topic/:topicId/articles", (req, res) => {
  res.json(articleFactory.getArticlesInTopic(req.params.topicId));
});

app.get("/topic/:topicId", async (req, res) => {
  const topic = topicFactory.getTopic(req.params.topicId);
  res.json({
    topic: {
      id: topic.id,
      name: topic.name,
      articleCount: topic.articles.length,
    },
  });
});

app.get("/topics", (req, res) => {
  res.json(topicFactory.getTopics());
});

app.post("/create/article", (req, res) => {
  const articleCreatedSuccessfully = articleFactory.createArticle(
    req.body.topicId,
    req.body.name,
    req.body.content,
    req.body.recommendedMonths
  );
  if (articleCreatedSuccessfully) {
    res.status(204).send();
  } else {
    res.status(400).send();
  }
});

app.post("/create/topic", (req, res) => {
  const topicCreatedSuccessfully = topicFactory.createTopic(req.body.topicName);
  if (topicCreatedSuccessfully) {
    res.status(204).send();
  } else {
    res.status(400).send();
  }
});

app.get("/search/suggestions", (req, res) => {
  res.json({ suggestions: searchFactory.getSearchSuggestions(req.query.q) });
});

app.get("/search", (req, res) => {
  res.json(searchFactory.search(req.query.q));
});

app.listen(3000);
