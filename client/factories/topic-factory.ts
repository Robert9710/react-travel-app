import { Topics } from "../application/types";
import HttpService from "../services/http-service";

class TopicFactory {
  async getTopic(reqObj: { topicId: string }) {
    const response = await HttpService.fetchData({
      path: `/topic/${reqObj.topicId}`,
    });
    return response;
  }

  async getTopics(reqObj: {
    queryParams: { pagenum?: string; pagesize: string } & Record<
      string,
      string
    >;
  }): Promise<Topics>;
  async getTopics(): Promise<Topics>;
  async getTopics(reqObj?: {
    queryParams: { pagenum?: string; pagesize: string } & Record<
      string,
      string
    >;
  }): Promise<Topics> {
    const response = await HttpService.fetchData({
      path: "/topics",
      queryParams: reqObj?.queryParams,
    });
    return response;
  }

  async createTopic(reqObj: { newTopicName: string }) {
    console.log(reqObj.newTopicName);
    //   const response = await fetch(`${this.#apiDomain}/create/topic`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       topicName: reqObj.newTopicName,
    //     }),
    //   });
    //   response.json();
  }
}

export default new TopicFactory();
