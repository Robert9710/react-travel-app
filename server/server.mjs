import express from "express";
import cors from "cors";
import { resolve } from "path";
import { init } from "./utils.mjs";
import topicFactory from "./factories/topic-factory.mjs";
import articleFactory from "./factories/article-factory.mjs";
import searchFactory from "./factories/search-factory.mjs";

export let [topics] = await init();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/topic/{:topicId}/article/:articleId/related", async (req, res) => {
  setTimeout(
    () =>
      res.json(
        articleFactory.getRelatedArticles({
          articleId: req.params.articleId,
          topicId: req.params.topicId,
          pagenum: req.query.pagenum,
          pagesize: req.query.pagesize,
        })
      ),
    2000
  );
});

app.get("/topic/{:topicId}/article/:articleId", (req, res) => {
  setTimeout(
    () =>
      res.json(
        articleFactory.getArticle({
          articleId: req.params.articleId,
          topicId: req.params.topicId,
        })
      ),
    2000
  );
});

app.get("/topic/:topicId/articles", (req, res) => {
  setTimeout(
    () =>
      res.json(
        articleFactory.getArticlesInTopic({
          topicId: req.params.topicId,
          pagenum: req.query.pagenum,
          pagesize: req.query.pagesize,
        })
      ),
    2000
  );
});

app.get("/topic/:topicId", async (req, res) => {
  const topic = topicFactory.getTopic({ topicId: req.params.topicId });
  setTimeout(
    () =>
      res.json({
        topic: {
          id: topic.id,
          name: topic.name,
          articleCount: topic.articles.length,
        },
      }),
    2000
  );
});

app.get("/topics", (req, res) => {
  setTimeout(
    () =>
      res.json(
        topicFactory.getTopics({
          pagenum: req.query.pagenum,
          pagesize: req.query.pagesize,
        })
      ),
    2000
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
  setTimeout(
    () =>
      res.json(
        searchFactory.search({
          query: req.query.q,
          maxCount: req.query.maxCount,
        })
      ),
    2000
  );
});

app.get("/search", (req, res) => {
  setTimeout(
    () =>
      res.json(
        searchFactory.search({
          query: req.query.q,
          pagenum: req.query.pagenum,
          pagesize: req.query.pagesize,
        })
      ),
    2000
  );
});

app.listen(process.env["PORT"] || 3000);
