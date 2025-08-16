// express, nodemon, fs, cors
import express from "express";
import cors from "cors";
import fs from "fs";
import { resolve } from "path";

const [topics, nextTopicId, nextArticleId] = await init();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/topic/:topicId/article/:articleId/related", async (req, res) => {
  res.json(getRelatedArticles(req.params.articleId, req.params.topicId));
});

app.get("/topic/:topicid/article/:articleId", (req, res) => {
  res.json(getArticle(req.params.articleId, req.params.topicId));
});

app.get("/topic/:topicId", async (req, res) => {
  res.json(getTopic(req.params.topicId));
});

app.get("/topics", (req, res) => {
  res.json(getTopics());
});

app.post("/create/article", (req, res) => {
  const articleCreatedSuccessfully = createArticle(
    req.body.topicId,
    req.body.title,
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
  const topicCreatedSuccessfully = createTopic(req.body.topicName);
  if (topicCreatedSuccessfully) {
    res.status(204).send();
  } else {
    res.status(400).send();
  }
});

function init() {
  return new Promise((resolve, reject) => {
    fs.readFile(`./server/data/Topics.json`, (err, data) => {
      const topics = JSON.parse(data);
      let nextTopicId = 10;
      let nextArticleId = 100;
      topics.forEach((topic) => {
        if (topic.id > nextTopicId) {
          nextTopicId = parseInt(topic.id);
        }
        topic.articles.forEach((article) => {
          if (article.id > nextArticleId) {
            nextArticleId = parseInt(article.id);
          }
        });
      });
      resolve([topics, ...increaseIds(nextTopicId, nextArticleId)]);
    });
  });
}

function increaseIds() {
  const ids = Object.values(arguments);
  if (ids.length > 0) {
    return ids.length > 1
      ? ids.map((id) => (parseInt(id) + 1).toString())
      : (parseInt(ids[0]) + 1).toString();
  }
}

function getTopics() {
  return {
    topics: topics.map((topic) => ({
      name: topic.name,
      id: topic.id,
      articleCount: topic.articles.length,
    })),
  };
}

function getTopicForArticle(articleId) {
  for (const topic of topics) {
    for (const article of topic.articles) {
      if (article.id === articleId) {
        return topic;
      }
    }
  }
}

function getArticle(articleId, topicId) {
  const topic = topicId ? getTopic(topicId) : getTopicForArticle(articleId);
  return {
    article: topic.articles.find((article) => article.id === articleId),
  };
}

function getRelatedArticles(articleId, topicId) {
  const topic = topicId ? getTopic(topicId) : getTopicForArticle(articleId);
  return {
    relatedArticles: topic.articles.filter(
      (article) => article.id !== articleId
    ),
  };
}

function getTopic(topicId) {
  return topics.find((topic) => topic.id === topicId);
}

function createTopic(topicName) {
  const isDuplicateTopic = !!topics.find((topic) => topic.name === topicName);
  if (!isDuplicateTopic) {
    topics.push({
      name: topicName,
      id: nextTopicId,
      articles: [],
    });
    fs.writeFile(
      `./server/data/Topics.json`,
      JSON.stringify(topics),
      {},
      (err) => {
        if (!err) {
          nextTopicId = increaseIds(nextTopicId);
        }
      }
    );
    return true;
  } else {
    return false;
  }
}

function createArticle(topicId, title, content, recommendedMonths) {
  const topic = topics.find((topic) => topic.id === topicId);
  const isDuplicateArticle = !!topic.articles.find(
    (article) => article.title === title
  );
  if (!isDuplicateArticle) {
    topic.articles.push({
      id: nextArticleId,
      title: title,
      recommended: recommendedMonths,
      content: content,
    });
    fs.writeFile(
      `./server/data/Topics.json`,
      JSON.stringify(topics),
      {},
      (err) => {
        if (!err) {
          nextArticleId = increaseIds(nextArticleId);
        }
      }
    );
    return true;
  } else {
    return false;
  }
}

// function getArticlesInTopic(topicId) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(`./server/data/${topicName}.json`, (err, data) => {
//       resolve(
//         JSON.parse(data).articles.map((article) => ({
//           id: article.id,
//           title: article.title,
//         }))
//       );
//     });
//   });
// }

// async function getTopicAndArticles(topics) {
//   return new Promise(async (resolve, reject) => {
//     const topicObjects = await Promise.all(
//       topics.map(async (topic) => {
//         // const topicArticles = await getArticlesInTopic(topic);
//         return { title: topic, articles: await getArticlesInTopic(topic) };
//       })
//     );
//     resolve({ topics: topicObjects });
//   });
// }

app.listen(3000);
