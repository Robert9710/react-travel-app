import { Link } from "react-router";
import "./ArticleBreadcrumb.css";
import chevronRight from "../../icons/chevron-right.svg";
import articleFactory from "../../factories/article-factory";
import { useQuery } from "@tanstack/react-query";

export default function ArticleBreadcrumb(props: {
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
      <div id="article-breadcrumb" className="placeholder-glow">
        <span className="placeholder col-3"></span>
      </div>
    );
  }
  if (articleData) {
    return (
      <div id="article-breadcrumb">
        <Link to="/">Home</Link>
        <img className="breadcrumb-separator" src={chevronRight}></img>
        <Link to={`/topic/${articleData.topicSummary.id}`}>
          {articleData.topicSummary.name}
        </Link>
        <img className="breadcrumb-separator" src={chevronRight}></img>
        <span>{articleData.name}</span>
      </div>
    );
  }
}
