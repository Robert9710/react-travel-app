import { Article, Articles } from "../application/types";
import HttpService from "../services/http-service";

class ArticleFactory {
  async getArticle(reqObj: {
    articleId: string;
    topicId?: string;
  }): Promise<Article> {
    const response = await HttpService.fetchData({
      path: `/topic/${reqObj.topicId || ""}/article/${reqObj.articleId}`,
    });
    return this.processArticleData(response.article);
  }
  async getRelatedArticles(reqObj: {
    articleId: string;
    topicId?: string;
    queryParams: Record<string, string>;
  }): Promise<Articles> {
    const response = await HttpService.fetchData({
      path: `/topic/${reqObj.topicId || ""}/article/${
        reqObj.articleId
      }/related`,
      queryParams: reqObj.queryParams,
    });
    return response;
  }
  async getArticlesInTopic(reqObj: {
    topicId: string;
    queryParams: Record<string, string>;
  }): Promise<Articles> {
    const response = await HttpService.fetchData({
      path: `/topic/${reqObj.topicId}/articles`,
      queryParams: reqObj.queryParams,
    });
    return response;
  }
  async createArticle(reqObj: {
    topicName: string;
    articleName: string;
    recommendedMonths: string[];
    content: string;
  }) {
    console.log(reqObj.topicName);
    // const response = await fetch(`${this.#apiDomain}/create/article`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     topicId: reqObj.topicName,
    //     name: reqObj.articleName,
    //     recommendedMonths: reqObj.recommendedMonths,
    //     content: reqObj.content,
    //   }),
    // });
    // response.json();
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
