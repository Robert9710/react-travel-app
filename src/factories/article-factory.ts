import { Article, Articles } from "../application/types";
import appConfig from "../application/config.json";

class ArticleFactory {
  async getArticle(reqObj: {
    articleId: string;
    topicId?: string;
  }): Promise<{ article: Article }> {
    console.log();
    const response = await fetch(
      `${appConfig.Variables.apiDomain}/topic/${reqObj.topicId || ""}/article/${
        reqObj.articleId
      }`
    );
    return await response.json();
  }
  async getRelatedArticles(reqObj: {
    articleId: string;
    topicId?: string;
  }): Promise<Articles> {
    const response = await fetch(
      `${appConfig.Variables.apiDomain}/topic/${reqObj.topicId || ""}/article/${
        reqObj.articleId
      }/related`
    );
    return await response.json();
  }
  async getArticlesInTopic(reqObj: { topicId: string }): Promise<Articles> {
    const response = await fetch(
      `${appConfig.Variables.apiDomain}/topic/${reqObj.topicId}/articles`
    );
    return await response.json();
  }
  async createArticle(reqObj: {
    topicName: string;
    articleName: string;
    recommendedMonth: string;
    content: string;
  }) {
    const response = await fetch(
      `${appConfig.Variables.apiDomain}/create/article`,
      {
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
      }
    );
    response.json();
  }
}

export default new ArticleFactory();
