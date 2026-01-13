import "./TopicBlock.css";
import { Link } from "react-router";
import { Topic } from "../../application/types";
import articleFactory from "../../factories/article-factory";
import config from "./config.json";
import { useQuery } from "@tanstack/react-query";

export default function TopicBlock(props: { topic: Topic }) {
  const numberOfArticlesToShow = config.numberOfArticlesToShow;
  const { isPending, data: articles } = useQuery({
    queryKey: ["topicArticlesData", props.topic.id],
    queryFn: async () =>
      await articleFactory.getArticlesInTopic({
        topicId: props.topic.id,
        queryParams: { pagesize: numberOfArticlesToShow.toString() },
      }),
  });
  if (isPending) {
    return (
      <div
        id="topic-block"
        className="placeholder-glow col-12 col-sm-5 col-lg-3"
      >
        <div className="topic-heading-container">
          <h3>{props.topic.name}</h3>
        </div>
        <p className="article-count placeholder col-4"></p>
      </div>
    );
  }
  if (articles) {
    return (
      <div id="topic-block" className="col-12 col-sm-5 col-lg-3">
        <div className="topic-heading-container">
          <Link to={`/topic/${props.topic.id}`}>
            <h3>{props.topic.name}</h3>
          </Link>
        </div>
        <ul className="topic-articles">
          {articles.articles.map((article, index) => (
            <li key={index} className="topic-article-container">
              <Link
                to={`/topic/${props.topic.id}/article/${article.id}/${article.name}`}
              >
                {article.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="article-count">
          {articles.paginationInfo.count}&nbsp;
          {articles.paginationInfo.count > 1 ? "Articles" : "Article"}
        </p>
      </div>
    );
  }
}
