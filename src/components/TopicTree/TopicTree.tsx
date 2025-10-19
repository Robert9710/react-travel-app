import { Link } from "react-router";
import { Topics } from "../../application/types";
import "./TopicTree.css";
import { useEffect, useState } from "react";
import topicFactory from "../../factories/topic-factory";

export default function TopicTree() {
  const [topics, setTopics] = useState<Topics>();
  useEffect(() => {
    topicFactory.getTopics().then((data) => setTopics(data));
  }, []);
  useEffect(() => {}, []);
  if (topics) {
    return (
      <div id="topic-tree">
        <div className="heading-container">
          <h3>Topics</h3>
        </div>
        <ul className="topics">
          {topics.topics.map(
            (topic) =>
              topic.articleCount > 0 && (
                <li key={topic.id} className="topics-item-container">
                  <Link to={`/topic/${topic.id}`} className="topics-item">
                    <p className="topics-item-text">{topic.name}</p>
                  </Link>
                </li>
              )
          )}
        </ul>
      </div>
    );
  }
}
