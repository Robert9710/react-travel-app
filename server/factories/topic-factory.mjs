import DBService from "../services/db-service.mjs";
import { paginateResults } from "../utils.mjs";

class TopicFactory {
  async getTopics(reqObj) {
    const [res] = await DBService.getItems({
      tableName: "Topics",
      indexName: "UserIdIndex",
      conditionKey: "UserId",
      conditionValue: "0",
    });
    let topics = paginateResults({
      results: res,
      pagenum: reqObj.pagenum,
      pagesize: reqObj.pagesize,
    });
    for (let topic of topics) {
      topic.articleCount = await this.getArticleCountForTopic({
        topicId: topic.Id,
      });
    }
    topics = topics.map((topic) => {
      return {
        id: topic.Id,
        name: topic.Name,
        articleCount: topic.articleCount,
      };
    });
    return {
      topics: topics,
      paginationInfo: {
        count: res.length,
        pagenum: reqObj.pagenum || 1,
        pagesize: reqObj.pagesize || topics.length,
      },
    };
  }

  async getArticleCountForTopic(reqObj) {
    const [, count] = await DBService.getItems({
      tableName: "Articles",
      indexName: "TopicIdIndex",
      conditionKey: "TopicId",
      conditionValue: reqObj.topicId,
    });
    return count;
  }

  // getTopicForArticle = async (reqObj) => {
  //   for (const topic of topics) {
  //     for (const article of topic.articles) {
  //       if (article.id === reqObj.articleId) {
  //         return topic;
  //       }
  //     }
  //   }
  // };

  async getTopic(reqObj) {
    const res = await DBService.getItem({
      tableName: "Topics",
      key: {
        Id: reqObj.topicId,
      },
    });
    return { topic: { id: res?.Id, name: res?.Name } };
  }

  async createTopic(reqObj) {
    const isDuplicateTopic = !!topics.find(
      (topic) => topic.name === reqObj.topicName
    );
    if (!isDuplicateTopic) {
      topics.push({
        id: this.getNextTopicId(),
        name: reqObj.topicName,
        articles: [],
      });
      // fs.writeFile(
      //   `./server/data/Topics.json`,
      //   JSON.stringify(topics),
      //   (err) => {}
      // );
      return true;
    } else {
      return false;
    }
  }
}

export default new TopicFactory();
