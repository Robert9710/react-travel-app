import "./TopicBlock.css";
import { Link } from "react-router";
import { Topic } from "../../application/types";
import articleFactory from "../../factories/article-factory";
import config from "./config.json";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";

export default function TopicBlock(props: { topic: Topic }) {
  const numberOfArticlesToShow = config.numberOfArticlesToShow;
  const { isPending, data: articles } = useQuery({
    queryKey: ["topicArticlesData", props.topic.id],
    queryFn: async () =>
      await articleFactory.getArticlesInTopic({
        topicId: props.topic.id,
        pagesize: numberOfArticlesToShow,
      }),
  });
  if (isPending) {
    <Loader />;
  }
  if (articles) {
    return (
      <div id="topic-block" className="col-3">
        <Link to={`/topic/${props.topic.id}`}>
          <h3>{props.topic.name}</h3>
        </Link>
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
