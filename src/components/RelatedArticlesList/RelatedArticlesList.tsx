// @ts-ignore
import "./RelatedArticlesList.css";
import { Link } from "react-router";
import {
  ArticleProps,
  ArticleDetails,
  Articles,
} from "../../application/types";
import { useEffect, useState } from "react";
import articleFactory from "../../factories/article-factory";
import config from "./config.json";

export default function RelatedArticlesList(props: ArticleProps) {
  const numberOfArticlesPerPage = config.numberOfArticlesPerPage;
  const [relatedArticles, setRelatedArticles] = useState<Articles>();
  useEffect(() => {
    articleFactory
      .getRelatedArticles({
        articleId: props.articleId,
        topicId: props.topicId,
        pagesize: numberOfArticlesPerPage,
      })
      .then((response) => {
        setRelatedArticles(response);
      });
  }, [numberOfArticlesPerPage, props.articleId, props.topicId]);
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
