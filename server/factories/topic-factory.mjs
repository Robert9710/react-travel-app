import { AccessDeniedError, ValidationError } from "../errors.mjs";
import dbService from "../services/db-service.mjs";
import { paginateResults } from "../utils.mjs";

class TopicFactory {
  async getTopics(reqObj) {
    let [res] = await dbService.getItems({
      tableName: "Topics",
      indexName: "UserIdIndex",
      conditionKey: "UserId",
      conditionValue: "0",
    });
    res = res.filter(
      (topic) => topic.UserId === "0" || topic.UserId === reqObj.userId,
    );
    let topics = paginateResults({
      results: res,
      pagenum: reqObj.pagenum,
      pagesize: reqObj.pagesize,
    });
    for (let topic of topics) {
      topic.articleCount = await this.getArticleCountForTopic({
        topicId: topic.Id,
        userId: reqObj.userId,
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
    if (!reqObj.topicId) {
      throw new ValidationError("400-200");
    }
    let [articles] = await dbService.getItems({
      tableName: "Articles",
      indexName: "TopicIdIndex",
      conditionKey: "TopicId",
      conditionValue: reqObj.topicId,
    });
    articles = articles.filter(
      (article) => article.UserId === "0" || article.UserId === reqObj.userId,
    );
    return articles.length;
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
    if (!reqObj.topicId) {
      throw new ValidationError("400-200");
    }
    const res = await dbService.getItem({
      tableName: "Topics",
      key: {
        Id: reqObj.topicId,
      },
    });
    if (res.UserId !== "0" && res.UserId !== reqObj.userId) {
      throw AccessDeniedError("403-200");
    }
    const articleCount = await this.getArticleCountForTopic({
      topicId: res?.Id,
      userId: reqObj.userId,
    });
    return { topic: { id: res?.Id, name: res?.Name, articleCount } };
  }

  async createTopic(reqObj) {
    if (!reqObj.userId) {
      throw AccessDeniedError("401-200", "", 401);
    }
    if (!reqObj.topicName) {
      throw new ValidationError("400-201");
    }
    const isDuplicateTopic = !!topics.find(
      (topic) => topic.name === reqObj.topicName,
    );
    if (isDuplicateTopic) {
      throw new ValidationError("400-102");
    }
    let data = await dbService.getItem({
      tableName: "Ids",
      key: {
        Resource: "Topic",
      },
    });
    const newTopicId = (parseInt(data.LastId) + 1).toString();
    const newTopic = {
      id: newTopicId,
      name: reqObj.topicName,
    };
    await dbService.insertItem({ tableName: "Topics", item: newTopic });
    const resp = await dbService.updateItem({
      tableName: "Ids",
      key: {
        Resource: "Topic",
      },
      expressionKey: "LastId",
      expressionValue: newTopicId,
    });
  }
}

export default new TopicFactory();
