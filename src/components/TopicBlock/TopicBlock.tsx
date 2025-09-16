import "./TopicBlock.css";
import { Link } from "react-router";
import { Articles, Topic } from "../../application/types";
import useData from "../../application/useData";

interface TopicBlock {
  title: string;
  articles: { id: string; title: string }[];
}
export default function TopicBlock(props: { topic: Topic }) {
  const articles = useData<Articles>({
    url: `http://localhost:3000/topic/${props.topic.id}/articles`,
  });
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
