import { Link } from "react-router";
import { Article } from "../../application/types";
// @ts-ignore
import "./ArticleBreadcrumb.css";
// @ts-ignore
import chevronRight from "../../icons/chevron-right.svg";

export default function ArticleBreadcrumb(props: { article: Article }) {
  const article = props.article;
  if (article) {
    return (
      <div id="article-breadcrumb">
        <Link to="/">Home</Link>
        <img className="breadcrumb-separator" src={chevronRight}></img>
        <Link to={`/topic/${article.topicSummary.id}`}>
          {article.topicSummary.name}
        </Link>
        <img className="breadcrumb-separator" src={chevronRight}></img>
        <span>{article.name}</span>
      </div>
    );
  }
}
