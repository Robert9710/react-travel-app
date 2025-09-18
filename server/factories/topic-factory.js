import { topics } from "../server.js";
import { paginateResults } from "../utils.js";
import fs from "fs";

class TopicFactory {
  getTopics = (reqObj) => {
    const returnTopics = paginateResults({
      results: topics.map((topic) => ({
        id: topic.id,
        name: topic.name,
        articleCount: topic.articles.length,
      })),
      pagenum: reqObj.pagenum,
      pagesize: reqObj.pagesize,
    });
    return {
      topics: returnTopics,
      paginationInfo: {
        count: returnTopics.length,
        pagenum: reqObj.pagenum || 1,
        pagesize: reqObj.pagesize || returnTopics.length,
      },
    };
  };

  getTopicForArticle = (reqObj) => {
    for (const topic of topics) {
      for (const article of topic.articles) {
        if (article.id === reqObj.articleId) {
          return topic;
        }
      }
    }
  };

  getTopic = (reqObj) => {
    return topics.find((topic) => {
      return topic.id === reqObj.topicId;
    });
  };

  createTopic = (reqObj) => {
    const isDuplicateTopic = !!topics.find(
      (topic) => topic.name === reqObj.topicName
    );
    if (!isDuplicateTopic) {
      topics.push({
        id: getNextTopicId(),
        name: reqObj.topicName,
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
