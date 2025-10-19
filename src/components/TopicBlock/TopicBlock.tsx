import "./TopicBlock.css";
import { Link } from "react-router";
import { Articles, Topic } from "../../application/types";
import { useEffect, useState } from "react";
import articleFactory from "../../factories/article-factory";

export default function TopicBlock(props: { topic: Topic }) {
  const [articles, setArticles] = useState<Articles>();
  useEffect(() => {
    articleFactory
      .getArticlesInTopic({ topicId: props.topic.id })
      .then((data) => setArticles(data));
  }, [props.topic.id]);
  if (articles) {
    return (
      <div className="col-5 topic-block">
        <Link to={`/topic/${props.topic.id}`}>
          <h3>{props.topic.name}</h3>
        </Link>
        <ul>
          {articles.articles.map((article, index) => (
            <li key={index}>
              <Link
                to={`/topic/${props.topic.id}/article/${article.id}/${article.name}`}
              >
                {article.name}
              </Link>
            </li>
          ))}
        </ul>
        {
          <p className="article-count">
            {articles.paginationInfo.count}&nbsp;
            {articles.paginationInfo.count > 1 ? "Articles" : "Article"}
          </p>
        }
      </div>
    );
  }
}
