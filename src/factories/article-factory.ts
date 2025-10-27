import { Article, Articles } from "../application/types";
import appConfig from "../application/config.json";

class ArticleFactory {
  #apiDomain;
  constructor() {
    this.#apiDomain =
      process.env.NODE_ENV === "development"
        ? appConfig.DevVariables.apiDomain
        : appConfig.ProdVariables.apiDomain;
  }
  async getArticle(reqObj: {
    articleId: string;
    topicId?: string;
  }): Promise<{ article: Article }> {
    const response = await fetch(
      `${this.#apiDomain}/topic/${reqObj.topicId || ""}/article/${
        reqObj.articleId
      }`
    );
    return await response.json();
  }
  async getRelatedArticles(reqObj: {
    articleId: string;
    topicId?: string;
    pagenum?: number;
    pagesize?: number;
  }): Promise<Articles> {
    let queryParams = "";
    if (reqObj.pagesize) {
      queryParams =
        "pagenum=" + reqObj.pagenum + "&pagesize=" + reqObj.pagesize;
    }
    const response = await fetch(
      `${this.#apiDomain}/topic/${reqObj.topicId || ""}/article/${
        reqObj.articleId
      }/related?${queryParams}`
    );
    return await response.json();
  }
  async getArticlesInTopic(reqObj: {
    topicId: string;
    pagenum?: number;
    pagesize?: number;
  }): Promise<Articles> {
    let queryParams = "";
    if (reqObj.pagesize) {
      queryParams +=
        "pagenum=" + reqObj.pagenum + "&pagesize=" + reqObj.pagesize;
    }
    const response = await fetch(
      `${this.#apiDomain}/topic/${reqObj.topicId}/articles?${queryParams}`
    );
    return await response.json();
  }
  async createArticle(reqObj: {
    topicName: string;
    articleName: string;
    recommendedMonth: string;
    content: string;
  }) {
    const response = await fetch(`${this.#apiDomain}/create/article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topicId: reqObj.topicName,
        name: reqObj.articleName,
        recommended: reqObj.recommendedMonth,
        content: reqObj.content,
      }),
    });
    response.json();
  }
}

export default new ArticleFactory();
