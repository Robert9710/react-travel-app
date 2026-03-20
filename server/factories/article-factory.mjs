import topicFactory from "./topic-factory.mjs";
import dbService from "../services/db-service.mjs";
import { paginateResults } from "../utils.mjs";
import { AccessDeniedError, ValidationError } from "../errors.mjs";

class ArticleFactory {
  async getArticle(reqObj) {
    if (!reqObj.articleId) {
      throw new ValidationError("400-100");
    }
    const res = await dbService.getItem({
      tableName: "Articles",
      key: {
        Id: reqObj.articleId,
      },
    });
    if (res.UserId !== "0" && res.UserId !== reqObj.userId) {
      throw AccessDeniedError("403-200");
    }
    const topicSummary = (
      await topicFactory.getTopic({ topicId: res?.TopicId })
    ).topic;
    return {
      article: {
        id: res?.Id,
        name: res?.Name,
        recommendedMonths: res?.RecommendedMonths,
        content: res?.Content,
        topicSummary,
      },
    };
  }

  async getRelatedArticles(reqObj) {
    if (!reqObj.articleId) {
      throw new ValidationError("400-100");
    }
    if (reqObj.topicId) {
      let [items] = await dbService.getItems({
        tableName: "Articles",
        indexName: "TopicIdIndex",
        conditionKey: "TopicId",
        conditionValue: reqObj.topicId,
        requestedAttributes: ["Id", "Name"],
      });
      items = items.filter(
        (item) =>
          item.Id !== reqObj.articleId &&
          (item.UserId === "0" || item.UserId === reqObj.userId),
      );
      const count = items.length;
      const res = paginateResults({
        results: items,
        pagenum: reqObj.pagenum,
        pagesize: reqObj.pagesize,
      });
      return {
        articles: res.map((article) => {
          return { id: article.Id, name: article.Name };
        }),
        paginationInfo: {
          count: count,
          pagenum: reqObj.pagenum || 1,
          pagesize: reqObj.pagesize || res.length,
        },
      };
    } else {
      //Handle no topic id case
    }
  }

  async getArticlesInTopic(reqObj) {
    if (!reqObj.topicId) {
      throw new ValidationError("400-200");
    }
    let [items] = await dbService.getItems({
      tableName: "Articles",
      indexName: "TopicIdIndex",
      conditionKey: "TopicId",
      conditionValue: reqObj.topicId,
      requestedAttributes: ["Id", "Name", "UserId"],
    });
    items = items.filter(
      (item) => item.UserId === "0" || item.UserId === reqObj.userId,
    );
    const res = paginateResults({
      results: items,
      pagenum: reqObj.pagenum,
      pagesize: reqObj.pagesize,
    });
    return {
      articles: res.map((article) => {
        return { id: article.Id, name: article.Name };
      }),
      paginationInfo: {
        count: items.length,
        pagenum: reqObj.pagenum || 1,
        pagesize: reqObj.pagesize || res.length,
      },
    };
  }

  async createArticle(reqObj) {
    if (!reqObj.userId) {
      throw AccessDeniedError("401-200", "", 401);
    }
    if (!reqObj.name) {
      throw new ValidationError("400-101");
    }
    if (!reqObj.topicId) {
      throw new ValidationError("400-200");
    }
    const topicArticles = (
      await this.getArticlesInTopic({ topicId: reqObj.topicId })
    ).articles;
    const isDuplicateArticle = !!topicArticles.find(
      (article) => article.name === reqObj.name,
    );
    if (isDuplicateArticle) {
      throw new ValidationError("400-102");
    }
    let data = await dbService.getItem({
      tableName: "Ids",
      key: {
        Resource: "Article",
      },
    });
    const newArticleId = (parseInt(data.LastId) + 1).toString();
    const newArticle = {
      Id: newArticleId,
      Name: reqObj.name,
      Content: reqObj.content,
      RecommendedMonths: reqObj.recommendedMonths,
      TopicId: reqObj.topicId,
      UserId: reqObj.userId,
    };
    await dbService.insertItem({ tableName: "Articles", item: newArticle });
    const resp = await dbService.updateItem({
      tableName: "Ids",
      key: {
        Resource: "Article",
      },
      expressionKey: "LastId",
      expressionValue: newArticleId,
    });
  }
}

export default new ArticleFactory();
