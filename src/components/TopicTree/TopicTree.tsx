import { Link } from "react-router";
import { Topics } from "../../application/types";
import useData from "../../application/useData";
import "./TopicTree.css";

export default function TopicTree() {
  const topics = useData<Topics>({
    url: "http://localhost:3000/topics",
  });
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
