// express, nodemon, fs, cors
import express from "express";
import cors from "cors";
import fs from "fs";
import { resolve } from "path";

const app = express();
app.use(cors());

app.get("/topic/:topicName/article/:articleId/related", async (req, res) => {
  let articles = await getArticlesInTopic(req.params.topicName);
  articles = articles.filter((article) => article.id !== req.params.articleId);
  res.json(articles);
});

app.get("/topic/:topicName/article/:articleId", (req, res) => {
  fs.readFile(`./server/data/${req.params.topicName}.json`, (err, data) => {
    const article = JSON.parse(data).articles.find(
      (article) => article.id === req.params.articleId
    );
    res.json(article);
  });
});

app.get("/topic/:topicName", async (req, res) => {
  res.json({ articles: await getArticlesInTopic(req.params.topicName) });
});

app.get("/topics", (req, res) => {
  fs.readdir("./server/data", async (err, files) => {
    const topics = files.map((file) => file.split(".")[0]);
    res.json(await getTopicAndArticles(topics));
  });
  // res.json({ message: "Error" });
  //   res.download(path_to_file)
  //   res.render(path_to_html_file) - also requires a view engine
});

function getArticlesInTopic(topicName) {
  return new Promise((resolve, reject) => {
    fs.readFile(`./server/data/${topicName}.json`, (err, data) => {
      resolve(
        JSON.parse(data).articles.map((article) => ({
          id: article.id,
          title: article.title,
        }))
      );
    });
  });
}

async function getTopicAndArticles(topics) {
  return new Promise(async (resolve, reject) => {
    const topicObjects = await Promise.all(
      topics.map(async (topic) => {
        // const topicArticles = await getArticlesInTopic(topic);
        return { title: topic, articles: await getArticlesInTopic(topic) };
      })
    );
    resolve(topicObjects);
  });
}

app.listen(3000);
