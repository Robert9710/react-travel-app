import { useNavigate, useParams } from "react-router";
import ArticleContent from "../../components/ArticleContent/ArticleContent";
import RelatedArticlesList from "../../components/RelatedArticlesList/RelatedArticlesList";

export default function ViewArticle() {
  const { topicName, articleId } = useParams();
  const navigate = useNavigate();

  if (!topicName || !articleId) {
    navigate("./error-page");
  } else
    return (
      <>
        <div className="col-3"></div>
        <div className="col-6">
          <ArticleContent topicName={topicName} articleId={articleId} />
          <RelatedArticlesList topicName={topicName} articleId={articleId} />
        </div>
      </>
    );
}
