import appConfig from "../application/config.json";
import { Topics } from "../application/types";

class TopicFactory {
  #apiDomain;
  constructor() {
    this.#apiDomain =
      process.env.NODE_ENV === "development"
        ? appConfig.DevVariables.apiDomain
        : appConfig.ProdVariables.apiDomain;
  }
  async getTopic(reqObj: { topicId: string }) {
    const response = await fetch(`${this.#apiDomain}/topic/${reqObj.topicId}`);
    return await response.json();
  }
  async getTopics(reqObj: {
    pagenum?: number;
    pagesize: number;
  }): Promise<Topics>;
  async getTopics(): Promise<Topics>;
  async getTopics(reqObj?: {
    pagenum?: number;
    pagesize: number;
  }): Promise<Topics> {
    let queryParams = "";
    if (reqObj?.pagesize) {
      queryParams +=
        "pagenum=" + reqObj.pagenum + "&pagesize=" + reqObj.pagesize;
    }
    const response = await fetch(`${this.#apiDomain}/topics?${queryParams}`);
    return await response.json();
  }
  async createTopic(reqObj: { newTopicName: string }) {
    const response = await fetch(`${this.#apiDomain}/create/topic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topicName: reqObj.newTopicName,
      }),
    });
    response.json();
  }
}

export default new TopicFactory();
