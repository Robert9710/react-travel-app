import { Article, PaginationQueryParams } from "../application/types";
import articleService from "../services/article-service";

class ArticleFactory {
  async getArticle(reqObj: { articleId: string; topicId?: string }) {
    const response = await articleService.getArticle({
      topicId: reqObj.topicId,
      articleId: reqObj.articleId,
    });
    return this.processArticleData(response.article);
  }
  async getRelatedArticles(reqObj: {
    articleId: string;
    topicId?: string;
    queryParams: PaginationQueryParams;
  }) {
    const response = await articleService.getRelatedArticles({
      topicId: reqObj.topicId,
      articleId: reqObj.articleId,
      queryParams: reqObj.queryParams,
    });
    return response;
  }
  async getArticlesInTopic(reqObj: {
    topicId: string;
    queryParams: PaginationQueryParams;
  }) {
    const response = await articleService.getArticlesInTopic({
      topicId: reqObj.topicId,
      queryParams: reqObj.queryParams,
    });
    return response;
  }
  async createArticle(reqObj: {
    topicId: string;
    articleName: string;
    recommendedMonths: string[];
    content: string;
  }) {
    return await articleService.createArticle({
      topicId: reqObj.topicId,
      articleName: reqObj.articleName,
      recommendedMonths: reqObj.recommendedMonths,
      content: reqObj.content,
    });
  }

  processArticleData(article: Article["article"]): Article["article"] {
    if (Array.isArray(article?.recommendedMonths)) {
      article.recommendedMonths = article.recommendedMonths.reduce(
        (monthsString: string, month: string, index: number) => {
          return index !== 0
            ? monthsString + ", " + month
            : monthsString + month;
        },
        "",
      );
    }
    return article;
  }
}

export default new ArticleFactory();
