import { PaginationQueryParams, Topic, Topics } from "../application/types";
import httpService from "./http-service";

class TopicService {
  async getTopic(reqObj: { topicId: string }) {
    if (!reqObj.topicId) {
      throw new Error("Err");
    }
    const response = await httpService.fetchData<Topic>({
      relativeUrl: `/topic/${reqObj.topicId}`,
    });
    return this.#handleResponse(response);
  }

  async getTopics(reqObj: { queryParams?: PaginationQueryParams }) {
    let relativeUrl = "/topics";
    if (reqObj.queryParams) {
      relativeUrl += "?" + new URLSearchParams(reqObj.queryParams);
    }
    const response = await httpService.fetchData<Topics>({
      relativeUrl,
    });
    return this.#handleResponse(response);
  }

  async createTopic(reqObj: { newTopicName: string }) {
    if (!reqObj.newTopicName) {
      throw new Error("Err");
    }
    const response = await httpService.fetchData<{ success: boolean }>({
      relativeUrl: "/topic",
      method: "POST",
      body: { topicName: reqObj.newTopicName },
    });
    return this.#handleResponse(response);
  }

  #handleResponse<T>(response: T) {
    return response;
  }
}
export default new TopicService();
