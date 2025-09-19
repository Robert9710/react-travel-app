import { Link } from "react-router";
import useData from "../../application/useData";
import { Article } from "../../application/types";

export default function Bookmark(props: { articleId: string }) {
  const articleDetails = useData<{ article: Article }>({
    url: `http://localhost:3000/topic//article/${props.articleId}`,
  });
  if (articleDetails) {
    return (
      <Link
        className="bookmarks-list-item"
        to={`/topic/${articleDetails.article.topicSummary.id}/article/${articleDetails.article.id}/${articleDetails.article.name}`}
      >
        {articleDetails.article.name}
      </Link>
    );
  }
}
