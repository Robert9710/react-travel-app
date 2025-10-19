import "./TopicContent.css";
import { Link } from "react-router";
import type { Articles, Topic } from "../../application/types";
import { useEffect, useState } from "react";
import articleFactory from "../../factories/article-factory";

interface Props {
  topic: Topic;
}

export default function TopicContent(props: Props) {
  const [topicArticles, setTopicArticles] = useState<Articles>();
  useEffect(() => {
    articleFactory
      .getArticlesInTopic({ topicId: props.topic.id })
      .then((data) => setTopicArticles(data));
  }, [props.topic.id]);
  if (topicArticles && topicArticles.articles.length > 0) {
    return (
      <div id="topic-content">
        <h2 className="topic-name">{props.topic && props.topic.name}</h2>
        <h5 className="article-count">
          {topicArticles.articles.length}&nbsp;
          {(topicArticles.articles.length > 1 ? "articles" : "article") +
            " in this topic"}
        </h5>
        <ul>
          {topicArticles.articles.map((article, index) => (
            <li key={index}>
              <Link
                to={`/topic/${props.topic.id}/article/${article.id}/${article.name}`}
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
