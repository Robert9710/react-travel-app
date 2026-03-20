import { PaginationQueryParams } from "../application/types";
import topicService from "../services/topic-service";

class TopicFactory {
  async getTopic(reqObj: { topicId: string }) {
    const response = topicService.getTopic({ topicId: reqObj.topicId });
    return response;
  }

  async getTopics(reqObj?: { queryParams: PaginationQueryParams }) {
    const response = await topicService.getTopics({
      queryParams: reqObj?.queryParams,
    });
    return response;
  }

  async createTopic(reqObj: { newTopicName: string }) {
    return await topicService.createTopic({
      newTopicName: reqObj.newTopicName,
    });
  }
}

export default new TopicFactory();
