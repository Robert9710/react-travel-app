import "./TopicBlocks.css";
import TopicBlock from "../TopicBlock/TopicBlock";
import topicFactory from "../../factories/topic-factory";
import config from "./config.json";
import { useQuery } from "@tanstack/react-query";

export default function TopicBlocks() {
  const numberOfTopicsToShow = config.numberOfTopicsToShow;
  const placeholderBlocks = Array.from(
    { length: numberOfTopicsToShow },
    (number, index) => <PlaceholderBlock key={index} />
  );
  const { isPending, data: topics } = useQuery({
    queryKey: ["topicsData"],
    queryFn: async () =>
      await topicFactory.getTopics({ pagesize: numberOfTopicsToShow }),
  });
  return (
    <div id="topic-blocks">
      {isPending ? (
        placeholderBlocks
      ) : topics ? (
        topics.topics.map(
          (topic) =>
            topic.articleCount > 0 && (
              <TopicBlock key={topic.id} topic={topic} />
            )
        )
      ) : (
        <p>No Topics</p>
      )}
    </div>
  );
}

function PlaceholderBlock() {
  return (
    <div id="topic-block" className="placeholder-glow col-12 col-sm-5 col-lg-3">
      <div className="topic-heading-container">
        <h3 className="placeholder col-8"></h3>
      </div>
      <p className="article-count placeholder col-4"></p>
    </div>
  );
}
