import { useLoaderData, useNavigate, useParams } from "react-router";
import ArticleContent from "../../components/ArticleContent/ArticleContent";
import RelatedArticlesList from "../../components/RelatedArticlesList/RelatedArticlesList";
import ArticleBreadcrumb from "../../components/ArticleBreadcrumb/ArticleBreadcrumb";
import TopicTree from "../../components/TopicTree/TopicTree";

export default function ViewArticle() {
  const { topicId, articleId } = useParams();
  const navigate = useNavigate();
  const article = useLoaderData();
  if (!article || !articleId) {
    console.log("Err");
    navigate("/error-page");
  } else
    return (
      <div id="view-article" className="row">
        <div className="col-3 d-none d-sm-block">
          <TopicTree />
        </div>
        <div className="col-12 col-sm-9">
          <ArticleBreadcrumb article={article.article} />
          <ArticleContent article={article.article} articleId={articleId} />
          <RelatedArticlesList topicId={topicId} articleId={articleId} />
        </div>
      </div>
    );
}
