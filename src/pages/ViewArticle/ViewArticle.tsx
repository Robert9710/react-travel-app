import { useNavigate, useParams } from "react-router";
import ArticleContent from "../../components/ArticleContent/ArticleContent";
import RelatedArticlesList from "../../components/RelatedArticlesList/RelatedArticlesList";

export default function ViewArticle() {
  const { topicTitle, articleId } = useParams();
  const navigate = useNavigate();

  if (!topicTitle || !articleId) {
    navigate("./error-page");
  } else
    return (
      <div id="view-article" className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <ArticleContent topicTitle={topicTitle} articleId={articleId} />
          <RelatedArticlesList topicTitle={topicTitle} articleId={articleId} />
        </div>
      </div>
    );
}
