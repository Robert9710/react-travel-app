import "./RelatedArticlesList.css";
import { Link } from "react-router";
import { ArticleProps, ArticleDetails } from "../../application/types";
import articleFactory from "../../factories/article-factory";
import config from "./config.json";
import { useQuery } from "@tanstack/react-query";

export default function RelatedArticlesList(props: ArticleProps) {
  const numberOfArticlesPerPage = config.numberOfArticlesPerPage;
  const { isPending, data: relatedArticles } = useQuery({
    queryKey: ["relatedArticlesData", props.articleId, props.topicId],
    queryFn: async () =>
      await articleFactory.getRelatedArticles({
        articleId: props.articleId,
        topicId: props.topicId,
        pagesize: numberOfArticlesPerPage,
      }),
  });

  if (isPending) {
    return (
      <div id="related-articles-list" className="placeholder-glow">
        <h4>Related Articles</h4>
        <div className="placeholder col-7"></div>
        <div className="placeholder col-7"></div>
        <div className="placeholder col-7"></div>
      </div>
    );
  } else if (relatedArticles && relatedArticles.articles.length > 0) {
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
