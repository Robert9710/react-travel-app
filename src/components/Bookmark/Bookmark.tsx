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
        className="bookmarks-list-item col-9 col-md-10 col-lg-11"
        to={`/topic/${bookmarkDetails.topicSummary.id}/article/${bookmarkDetails.id}/${bookmarkDetails.name}`}
      >
        {bookmarkDetails.name}
      </Link>
    );
  }
}
