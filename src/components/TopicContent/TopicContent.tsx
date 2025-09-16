import "./TopicContent.css";
import { Link } from "react-router";
import useData from "../../application/useData";
import type { Articles, Topic } from "../../application/types";

interface Props {
  topicId: string;
}

export default function TopicContent(props: Props) {
  const topic = useData<{ topic: Topic }>({
    url: `http://localhost:3000/topic/${props.topicId}`,
  });
  const topicArticles = useData<Articles>({
    url: `http://localhost:3000/topic/${props.topicId}/articles`,
  });
  if (topicArticles && topicArticles.articles.length > 0) {
    return (
      <div id="topic-content">
        <h2 className="topic-name">{topic && topic.topic.name}</h2>
        <h5 className="article-count">
          {topicArticles.articles.length}&nbsp;
          {(topicArticles.articles.length > 1 ? "articles" : "article") +
            " in this topic"}
        </h5>
        <ul>
          {topicArticles.articles.map((article, index) => (
            <li key={index}>
              <Link
                to={`/topic/${props.topicId}/article/${article.id}/${article.name}`}
              >
                {article.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
