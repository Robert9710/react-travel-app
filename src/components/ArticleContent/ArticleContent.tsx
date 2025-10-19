import "./ArticleContent.css";
import { Article } from "../../application/types";
import ArticleActions from "../ArticleActions/ArticleActions";

export default function ArticleContent(props: {
  article: Article;
  articleId: string;
}) {
  const article = props.article;
  if (article) {
    return (
      <div id="article-content">
        <h2 className="article-name">{article.name}</h2>
        <h6 className="recommended-month">
          Recommended month(s): {article.recommendedMonths}
        </h6>
        <div className="article-text">{article.content}</div>
        <ArticleActions articleId={props.articleId} />
      </div>
    );
  }
}
