import topicFactory from "./topic-factory.mjs";
import DBService from "../services/db-service.mjs";
import { paginateResults } from "../utils.mjs";

class ArticleFactory {
  async getArticle(reqObj) {
    const res = await DBService.getItem({
      tableName: "Articles",
      key: {
        Id: reqObj.articleId,
      },
    });
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
    let [items] = await DBService.getItems({
      tableName: "Articles",
      indexName: "TopicIdIndex",
      conditionKey: "TopicId",
      conditionValue: reqObj.topicId,
      requestedAttributes: ["Id", "Name"],
    });
    items = items.filter((item) => item.Id !== reqObj.articleId);
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
  }

  async getArticlesInTopic(reqObj) {
    let [items] = await DBService.getItems({
      tableName: "Articles",
      indexName: "TopicIdIndex",
      conditionKey: "TopicId",
      conditionValue: reqObj.topicId,
      requestedAttributes: ["Id", "Name"],
    });
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
    const topic = topics.find((topic) => topic.id === reqObj.topicId);
    const isDuplicateArticle = !!topic.articles.find(
      (article) => article.name === reqObj.name
    );
    if (!isDuplicateArticle) {
      topic.articles.push({
        id: this.getNextArticleId(),
        name: reqObj.name,
        recommendedMonths: reqObj.recommendedMonths,
        content: reqObj.content,
      });
      //   fs.writeFile(
      //     `./server/data/Topics.json`,
      //     JSON.stringify(topics),
      //     (err) => {}
      //   );
      //   return true;
    } else {
      return false;
    }
  }
}

export default new ArticleFactory();
