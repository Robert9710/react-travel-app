import "./ArticleContent.css";
import useData from "../../application/useData";
import { Article, ArticleProps } from "../../application/types";
import ArticleActions from "../ArticleActions/ArticleActions";

export default function ArticleContent(props: ArticleProps) {
  const article = useData<{ article: Article }>({
    url: `http://localhost:3000/topic/${props.topicId}/article/${props.articleId}`,
  });
  if (article) {
    return (
      <div id="article-content">
        <h2 className="article-name">{article.article.name}</h2>
        <h6 className="recommended-month">
          Recommended month(s): {article.article.recommendedMonths}
        </h6>
        <div className="article-text">{article.article.content}</div>
        <ArticleActions articleId={props.articleId} />
      </div>
    );
  }
}
