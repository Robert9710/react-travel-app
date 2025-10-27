import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import articleFactory from "../../factories/article-factory";

export default function Bookmark(props: { articleId: string }) {
  const { data: bookmarkDetails } = useQuery({
    queryKey: ["bookmarkData", props.articleId],
    queryFn: async () => {
      return await articleFactory.getArticle({ articleId: props.articleId });
    },
  });
  if (bookmarkDetails) {
    return (
      <Link
        className="bookmarks-list-item"
        to={`/topic/${bookmarkDetails.article.topicSummary.id}/article/${bookmarkDetails.article.id}/${bookmarkDetails.article.name}`}
      >
        {bookmarkDetails.article.name}
      </Link>
    );
  }
}
