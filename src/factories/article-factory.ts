import { Article, Articles } from "../application/types";
import appConfig from "../application/config.json";

class ArticleFactory {
  #apiDomain;
  constructor() {
    this.#apiDomain = appConfig.apiDomain;
  }
  async getArticle(reqObj: {
    articleId: string;
    topicId?: string;
  }): Promise<Article> {
    const response = await fetch(
      `${this.#apiDomain}/topic/${reqObj.topicId || ""}/article/${
        reqObj.articleId
      }`
    );
    const article = (await response.json()).article;
    return this.processArticleData(article);
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
    recommendedMonths: string[];
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
        recommendedMonths: reqObj.recommendedMonths,
        content: reqObj.content,
      }),
    });
    response.json();
  }
  processArticleData(article: Article): Article {
    if (Array.isArray(article?.recommendedMonths)) {
      article.recommendedMonths = article.recommendedMonths.reduce(
        (monthsString: string, month: string, index: number) => {
          return index !== 0
            ? monthsString + ", " + month
            : monthsString + month;
        },
        ""
      );
    }
    return article;
  }
}

export default new ArticleFactory();
