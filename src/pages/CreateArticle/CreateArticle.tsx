import CreateArticleForm from "../../components/CreateArticleForm/CreateArticleForm";

export default function CreateArticle() {
  return (
    <div id="create-article" className="row">
      <div className="col-2"></div>
      <div className="col-8">
        <CreateArticleForm />
      </div>
      <div className="col-2"></div>
    </div>
  );
}
