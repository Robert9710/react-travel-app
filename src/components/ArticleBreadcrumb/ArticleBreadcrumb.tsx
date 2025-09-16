import { Link } from "react-router";
import { Article, ArticleProps } from "../../application/types";
import "./ArticleBreadcrumb.css";
import chevronRight from "../../icons/chevron-right.svg";
import useData from "../../application/useData";

export default function ArticleBreadcrumb(props: ArticleProps) {
  const article = useData<{ article: Article }>({
    url: `http://localhost:3000/topic/${props.topicId}/article/${props.articleId}`,
  });
  if (article) {
    return (
      <div id="article-breadcrumb">
        <Link to="/">Home</Link>
        <img className="breadcrumb-separator" src={chevronRight}></img>
        <Link to={`/topic/${article.article.topicSummary.id}`}>
          {article.article.topicSummary.name}
        </Link>
        <img className="breadcrumb-separator" src={chevronRight}></img>
        <span>{article.article.name}</span>
      </div>
    );
  }
}
