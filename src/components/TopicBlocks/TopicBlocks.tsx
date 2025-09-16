import "./TopicBlocks.css";
import TopicBlock from "../TopicBlock/TopicBlock";
import useData from "../../application/useData";
import { Topics } from "../../application/types";

export default function TopicsBlocks() {
  const topics = useData<Topics>({
    url: "http://localhost:3000/topics",
  });
  if (topics) {
    return (
      <div id="topic-blocks">
        {topics.topics.map(
          (topic, index) =>
            topic.articleCount > 0 && <TopicBlock key={index} topic={topic} />
        )}
      </div>
    );
  }
}
