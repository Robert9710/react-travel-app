import "./RelatedArticlesList.css";
import { Link } from "react-router";
import useData from "../../application/useData";

interface Props {
  topicName: string;
  articleId: string;
}

interface Article {
  id: string;
  title: string;
}

interface RelatedArticles {
  articles?: [];
}
export default function RelatedArticlesList(props: Props) {
  const relatedArticles: RelatedArticles = useData({
    url: `http://localhost:3000/topic/${props.topicName}/article/${props.articleId}/related`,
  });
  const articleElements =
    relatedArticles.articles &&
    relatedArticles.articles.map((article: Article) => (
      <li key={article.id}>
        <Link
          to={`/topic/${props.topicName}/article/${article.id}/${article.title}`}
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
