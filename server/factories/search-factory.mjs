import dbService from "../services/db-service.mjs";
import { paginateResults } from "../utils.mjs";

class SearchFactory {
  async getSearchSuggestions(reqObj) {
    let results = [];
    const topics = await this.#getTopics(reqObj.userId);
    const articles = await this.#getArticles(reqObj.userId);
    topics.forEach((topic) => {
      if (topic.Name.includes(reqObj.query)) {
        results.push({ resultType: "Topic", id: topic.Id, name: topic.Name });
      }
    });
    articles.forEach((article) => {
      if (
        article.Name.includes(reqObj.query) ||
        article.Content.includes(reqObj.query)
      ) {
        results.push({
          resultType: "Article",
          id: article.Id,
          name: article.Name,
          topicId: article.TopicId,
        });
      }
    });
    if (reqObj.maxCount) {
      results = paginateResults({ results, pagesize: reqObj.maxCount });
    }
    return { suggestions: results };
  }

  async search(reqObj) {
    let articlesFound = [];
    let topicsFound = [];
    let results = { articles: [], topics: [] };
    if (reqObj.maxCount) {
      reqObj.pagesize = reqObj.maxCount;
    }
    const topics = await this.#getTopics(reqObj.userId);
    const articles = await this.#getArticles(reqObj.userId);
    topics.forEach((topic) => {
      if (topic.Name.toLowerCase().includes(reqObj.query.toLowerCase())) {
        topicsFound.push({
          id: topic.Id,
          name: topic.Name,
          // articleCount: topic.articles.length,
        });
      }
    });
    articles.forEach((article) => {
      if (
        article.Name.toLowerCase().includes(reqObj.query.toLowerCase()) ||
        article.Content.includes(reqObj.query)
      ) {
        articlesFound.push({
          resultType: "Article",
          id: article.Id,
          name: article.Name,
          topicId: article.TopicId,
        });
      }
    });
    // console.log(articlesFound);
    // console.log(topicsFound);
    if (articlesFound.length > 0) {
      results.articles = paginateResults({
        results: articlesFound,
        pagenum: reqObj.pagenum,
        pagesize: reqObj.pagesize,
      });
    }
    if (
      (!reqObj.pagesize ||
        results.articles.length < reqObj.pagesize * (reqObj.pagenum || 1)) &&
      topicsFound.length > 0
    ) {
      results.topics = paginateResults({
        results: topicsFound,
        pagenum: articlesFound.length > 0 ? 1 : reqObj.pagenum,
        pagesize: reqObj.pagesize - results.articles.length,
      });
    }
    return {
      articles: results.articles,
      topics: results.topics,
      paginationInfo: {
        count: articlesFound.length + topicsFound.length,
        pagenum: reqObj.pagenum || 1,
        pagesize:
          reqObj.pagesize || results.articles.length + results.topics.length,
      },
    };
  }

  async #getArticles(userId) {
    let [articles] = await dbService.getItems({
      tableName: "Articles",
      indexName: "UserIdIndex",
      conditionKey: "UserId",
      conditionValue: "0",
      requestedAttributes: ["Id", "Name", "Content", "TopicId"],
    });
    if (userId) {
      let [userArticles] = await dbService.getItems({
        tableName: "Articles",
        indexName: "UserIdIndex",
        conditionKey: "UserId",
        conditionValue: userId,
        requestedAttributes: ["Id", "Name", "Content", "TopicId"],
      });
      articles = articles.concat(userArticles);
    }
    return articles;
  }

  async #getTopics(userId) {
    let [topics] = await dbService.getItems({
      tableName: "Topics",
      indexName: "UserIdIndex",
      conditionKey: "UserId",
      conditionValue: "0",
      requestedAttributes: ["Id", "Name"],
    });
    if (userId) {
      let [userTopics] = await dbService.getItems({
        tableName: "Topics",
        indexName: "UserIdIndex",
        conditionKey: "UserId",
        conditionValue: userId,
        requestedAttributes: ["Id", "Name"],
      });
      topics = topics.concat(userTopics);
    }
    return topics;
  }
}

export default new SearchFactory();
