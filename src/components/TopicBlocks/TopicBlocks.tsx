import "./TopicBlocks.css";
import TopicBlock from "../TopicBlock/TopicBlock";
import topicFactory from "../../factories/topic-factory";
import config from "./config.json";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";

export default function TopicsBlocks() {
  const numberOfTopicsToShow = config.numberOfTopicsToShow;
  const { isPending, data: topics } = useQuery({
    queryKey: ["topicsData"],
    queryFn: async () =>
      await topicFactory.getTopics({ pagesize: numberOfTopicsToShow }),
  });
  if (isPending) {
    return <Loader />;
  }
  if (topics) {
    return (
      <div id="topic-blocks">
        {topics.topics.map(
          (topic) =>
            topic.articleCount > 0 && (
              <TopicBlock key={topic.id} topic={topic} />
            )
        )}
      </div>
    );
  } else return <p>No Topics</p>;
}
