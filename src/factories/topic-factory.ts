import appConfig from "../application/config.json";

class TopicFactory {
  async getTopic(reqObj: { topicId: string }) {
    const response = await fetch(
      `${appConfig.Variables.apiDomain}/topic/${reqObj.topicId}`
    );
    return await response.json();
  }
  async getTopics() {
    const response = await fetch(`${appConfig.Variables.apiDomain}/topics`);
    return await response.json();
  }
  async createTopic(reqObj: { newTopicName: string }) {
    const response = await fetch(
      `${appConfig.Variables.apiDomain}/create/topic`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topicName: reqObj.newTopicName,
        }),
      }
    );
    response.json();
  }
}

export default new TopicFactory();
