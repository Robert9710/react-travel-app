import useData from "../../application/useData";
import { Article, ArticleProps } from "../../application/types";

export default function ArticleContent(props: ArticleProps) {
  const article = useData<Article>({
    url: `http://localhost:3000/topic/${props.topicTitle}/article/${props.articleId}`,
  });
  return (
    <>
      <h2>{article && article.title}</h2>
      <div>{article && article.content}</div>
    </>
  );
}
