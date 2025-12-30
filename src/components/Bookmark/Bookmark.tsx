import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import articleFactory from "../../factories/article-factory";

export default function Bookmark(props: {
  children?: React.ReactNode;
  articleId: string;
}) {
  const { isPending, data: bookmarkDetails } = useQuery({
    queryKey: ["bookmarkData", props.articleId],
    queryFn: async () => {
      return await articleFactory.getArticle({ articleId: props.articleId });
    },
  });

  if (isPending) {
    return (
      <div className="placeholder-glow col-12">
        <span className="placeholder col-3"></span>
      </div>
    );
  }
  if (bookmarkDetails) {
    return (
      <>
        <Link
          className="bookmarks-list-item col-9 col-md-10 col-lg-11"
          to={`/topic/${bookmarkDetails.topicSummary.id}/article/${bookmarkDetails.id}/${bookmarkDetails.name}`}
        >
          {bookmarkDetails.name}
        </Link>
        {props.children}
      </>
    );
  }
}
