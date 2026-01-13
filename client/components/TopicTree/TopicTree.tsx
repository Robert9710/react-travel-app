import { Link } from "react-router";
import "./TopicTree.css";
import topicFactory from "../../factories/topic-factory";
import { useQuery } from "@tanstack/react-query";

export default function TopicTree() {
  const { isPending, data: topics } = useQuery({
    queryKey: ["topicTreeData"],
    queryFn: async () => await topicFactory.getTopics(),
  });
  if (isPending) {
    return (
      <div id="topic-tree">
        <div className="heading-container">
          <h3>Topics</h3>
        </div>
        <div className="placeholder-glow col-6">
          <span className="topics-item-container placeholder col-12"></span>
          <span className="topics-item-container placeholder col-12"></span>
          <span className="topics-item-container placeholder col-12"></span>
          <span className="topics-item-container placeholder col-12"></span>
          <span className="topics-item-container placeholder col-12"></span>
          <span className="topics-item-container placeholder col-12"></span>
        </div>
      </div>
    );
  }
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
