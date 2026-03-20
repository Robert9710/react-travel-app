import { Article, Articles, PaginationQueryParams } from "../application/types";
import httpService from "./http-service";

class ArticleService {
  async getArticle(reqObj: { articleId: string; topicId?: string }) {
    if (!reqObj.articleId) {
      throw new Error("Err");
    }
    const response = await httpService.fetchData<Article>({
      relativeUrl: `/topic/${reqObj.topicId || ""}/article/${reqObj.articleId}`,
    });
    return this.#handleResponse(response);
  }

  async getRelatedArticles(reqObj: {
    articleId: string;
    topicId?: string;
    queryParams?: PaginationQueryParams;
  }) {
    if (!reqObj.articleId) {
      throw new Error("Err");
    }
    let relativeUrl = `/topic/${reqObj.topicId || ""}/article/${
      reqObj.articleId
    }/related`;
    if (reqObj.queryParams) {
      relativeUrl += "?" + new URLSearchParams(reqObj.queryParams);
    }
    const response = await httpService.fetchData<Articles>({
      relativeUrl,
    });
    return this.#handleResponse(response);
  }

  async getArticlesInTopic(reqObj: {
    topicId: string;
    queryParams?: PaginationQueryParams;
  }) {
    if (!reqObj.topicId) {
      throw new Error("Err");
    }
    let relativeUrl = `/topic/${reqObj.topicId}/articles`;
    if (reqObj.queryParams) {
      relativeUrl += "?" + new URLSearchParams(reqObj.queryParams);
    }
    const response = await httpService.fetchData<Articles>({
      relativeUrl,
    });
    return this.#handleResponse(response);
  }

  async createArticle(reqObj: {
    topicId: string;
    articleName: string;
    recommendedMonths?: string[];
    content?: string;
  }) {
    if (!reqObj.topicId) {
      throw new Error("Err");
    }
    if (!reqObj.articleName) {
      throw new Error("Err");
    }
    const response = await httpService.fetchData<{ success: boolean }>({
      relativeUrl: `/article`,
      method: "POST",
      body: {
        topicId: reqObj.topicId,
        name: reqObj.articleName,
        recommendedMonths: reqObj.recommendedMonths || [],
        content: reqObj.content || "",
      },
    });
    console.log("createArticle: ", response);
    return this.#handleResponse(response);
  }

  #handleResponse<T>(response: T) {
    return response;
  }
}
export default new ArticleService();
