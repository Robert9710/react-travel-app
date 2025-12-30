import "./ArticleContent.css";
import ArticleActions from "../ArticleActions/ArticleActions";
import articleFactory from "../../factories/article-factory";
import { useQuery } from "@tanstack/react-query";

export default function ArticleContent(props: {
  topicId: string;
  articleId: string;
}) {
  const { isFetching, data: articleData } = useQuery({
    queryKey: ["article", props.articleId, props.topicId],
    queryFn: async () =>
      await articleFactory.getArticle({
        articleId: props.articleId,
        topicId: props.topicId,
      }),
  });
  if (isFetching) {
    return (
      <div id="article-content">
        <h2 className="article-name placeholder-glow">
          <span className="placeholder col-2"></span>
        </h2>
        <h6 className="recommended-month placeholder-glow">
          <span className="placeholder col-4"></span>
        </h6>
        <div className="article-text placeholder-glow">
          <span className="placeholder col-12"></span>
          <span className="placeholder col-12"></span>
          <span className="placeholder col-12"></span>
          <span className="placeholder col-12"></span>
          <span className="placeholder col-12"></span>
        </div>
      </div>
    );
  }
  if (articleData) {
    return (
      <div id="article-content">
        <h2 className="article-name">{articleData.name}</h2>
        <h6 className="recommended-month">
          Recommended month(s): {articleData.recommendedMonths || ""}
        </h6>
        <div className="article-text">{articleData.content}</div>
        <ArticleActions articleId={props.articleId} />
      </div>
    );
  }
}
