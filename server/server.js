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
    articleFactory.getRelatedArticles({
      articleId: req.params.articleId,
      topicId: req.params.topicId,
      pagenum: req.query.pagenum,
      pagesize: req.query.pagesize,
    })
  );
});

app.get("/topic/{:topicId}/article/:articleId", (req, res) => {
  res.json(
    articleFactory.getArticle({
      articleId: req.params.articleId,
      topicId: req.params.topicId,
    })
  );
});

app.get("/topic/:topicId/articles", (req, res) => {
  res.json(
    articleFactory.getArticlesInTopic({
      topicId: req.params.topicId,
      pagenum: req.query.pagenum,
      pagesize: req.query.pagesize,
    })
  );
});

app.get("/topic/:topicId", async (req, res) => {
  const topic = topicFactory.getTopic({ topicId: req.params.topicId });
  res.json({
    topic: {
      id: topic.id,
      name: topic.name,
      articleCount: topic.articles.length,
    },
  });
});

app.get("/topics", (req, res) => {
  res.json(
    topicFactory.getTopics({
      pagenum: req.query.pagenum,
      pagesize: req.query.pagesize,
    })
  );
});

app.post("/create/article", (req, res) => {
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

app.post("/create/topic", (req, res) => {
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
    searchFactory.getSearchSuggestions({
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

app.listen(3000);
