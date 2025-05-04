import "./TopicBlocks.css";
import TopicBlock from "../TopicBlock/TopicBlock";
import useData from "../../application/useData";
import { Topics } from "../../application/types";

export default function TopicsBlocks() {
  const topicsData: Topics | null = useData({
    url: "http://localhost:3000/topics",
  });

  const topicBlocks =
    topicsData &&
    topicsData.topics.map((topic, index) => (
      <TopicBlock key={index} title={topic.title} articles={topic.articles} />
    ));

  return <div id="topic-blocks">{topicBlocks}</div>;
}
