// express, nodemon, fs, cors
import express from "express";
import cors from "cors";
import fs from "fs";
import { resolve } from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/topic/:topicName/article/:articleId/related", async (req, res) => {
  let articles = await getArticlesInTopic(req.params.topicName);
  articles = articles.filter((article) => article.id !== req.params.articleId);
  res.json({ articles: articles });
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

app.post("/create/article", (req, res) => {
  fs.readFile(`./server/data/${req.body.topicName}.json`, (err, data) => {
    let topicData = JSON.parse(data);
    let id = 0;
    topicData.articles.forEach((article) => {
      if (parseInt(article.id) > id) {
        id = article.id;
      }
    });
    if (id === 0) {
      id = (++id * 10 + topicData.id / 10) * 100;
    }
    topicData.articles.push({
      id: (++id).toString(),
      title: req.body.title,
      recommended: req.body.recommended,
      content: req.body.content,
    });
    fs.writeFile(
      `./server/data/${req.body.topicName}.json`,
      JSON.stringify(topicData),
      {},
      (err) => {}
    );
    res.status(204).send();
  });
});

app.post("/create/topic", (req, res) => {
  fs.readdir("./server/data", async (err, files) => {
    const topics = files.map((file) => file.split(".")[0]);
    const isDuplicateTopic = topics.find(
      (topic) => topic === req.body.topicName
    );
    if (!isDuplicateTopic) {
      let id = 0;
      topics.forEach((topic) => {
        const topicData = JSON.parse(
          fs.readFileSync(`./server/data/${topic}.json`)
        );
        if (parseInt(topicData.id) > id) {
          id = topicData.id;
        }
      });
      fs.writeFile(
        `./server/data/${req.body.topicName}.json`,
        JSON.stringify({ id: (++id).toString(), articles: [] }),
        {},
        (err) => {}
      );
      res.status(204).send();
    } else {
      res.status(400).send();
    }
  });
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
    resolve({ topics: topicObjects });
  });
}

app.listen(3000);
