import useData from "../../application/useData";

interface Props {
  topicName: string;
  articleId: string;
}

interface Article {
  title?: string;
  content?: string;
}

export default function ArticleContent(props: Props) {
  const article: Article = useData({
    url: `http://localhost:3000/topic/${props.topicName}/article/${props.articleId}`,
  });
  console.log("Art");
  return (
    <>
      <h2>{article.title}</h2>
      <div>{article.content}</div>
    </>
  );
}
