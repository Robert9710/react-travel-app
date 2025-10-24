import "./TopicBlocks.css";
import TopicBlock from "../TopicBlock/TopicBlock";
import { Topics } from "../../application/types";
import { useEffect, useState } from "react";
import topicFactory from "../../factories/topic-factory";
import config from "./config.json";

export default function TopicsBlocks() {
  const numberOfTopicsToShow = config.numberOfTopicsToShow;
  const [topics, setTopics] = useState<Topics>();
  useEffect(() => {
    topicFactory
      .getTopics({ pagesize: numberOfTopicsToShow })
      .then((data) => setTopics(data));
  }, [numberOfTopicsToShow]);
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
  }
}
