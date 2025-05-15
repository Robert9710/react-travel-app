import "./RelatedArticlesList.css";
import { Link } from "react-router";
import useData from "../../application/useData";
import {
  ArticleProps,
  ArticleIdentifiers,
  RelatedArticles,
} from "../../application/types";

export default function RelatedArticlesList(props: ArticleProps) {
  const relatedArticles = useData<RelatedArticles>({
    url: `http://localhost:3000/topic/${props.topicTitle}/article/${props.articleId}/related`,
  });
  const articleElements =
    relatedArticles &&
    relatedArticles.articles.map((article: ArticleIdentifiers) => (
      <li key={article.id}>
        <Link
          to={`/topic/${props.topicTitle}/article/${article.id}/${article.title}`}
        >
          {article.title}
        </Link>
      </li>
    ));
  return (
    <>
      <ul>{articleElements}</ul>
    </>
  );
}
