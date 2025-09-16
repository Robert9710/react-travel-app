import "./RelatedArticlesList.css";
import { Link } from "react-router";
import useData from "../../application/useData";
import {
  ArticleProps,
  ArticleDetails,
  Articles,
} from "../../application/types";

export default function RelatedArticlesList(props: ArticleProps) {
  const relatedArticles = useData<Articles>({
    url: `http://localhost:3000/topic/${props.topicId}/article/${props.articleId}/related`,
  });
  if (relatedArticles && relatedArticles.articles.length > 0) {
    return (
      <div id="related-articles-list">
        <h4>Related Articles</h4>
        <ul className="articles-list">
          {relatedArticles.articles.map((article: ArticleDetails) => (
            <li className="articles-list-item-container" key={article.id}>
              <Link
                className="articles-list-item"
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
