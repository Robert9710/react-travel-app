import { topics } from "../server.js";
import fs from "fs";

class TopicFactory {
  getTopics = () => {
    return {
      topics: topics.map((topic) => ({
        id: topic.id,
        name: topic.name,
        articleCount: topic.articles.length,
      })),
      paginationInfo: {
        count: topics.length,
      },
    };
  };

  getTopicForArticle = (articleId) => {
    for (const topic of topics) {
      for (const article of topic.articles) {
        if (article.id === articleId) {
          return topic;
        }
      }
    }
  };

  getTopic = (topicId) => {
    return topics.find((topic) => topic.id === topicId);
  };

  createTopic = (topicName) => {
    const isDuplicateTopic = !!topics.find((topic) => topic.name === topicName);
    if (!isDuplicateTopic) {
      topics.push({
        id: getNextTopicId(),
        name: topicName,
        articles: [],
      });
      fs.writeFile(`./server/data/Topics.json`, JSON.stringify(topics));
      return true;
    } else {
      return false;
    }
  };

  getNextTopicId = () => {
    let nextTopicId = 10;
    topics.forEach((topic) => {
      if (topic.id > nextTopicId) {
        nextTopicId = parseInt(topic.id);
      }
    });
    nextTopicId += 1;
    return nextTopicId.toString();
  };
}

let topicFactory = new TopicFactory();
export default topicFactory;
