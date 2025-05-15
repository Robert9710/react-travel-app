import "./TopicContent.css";
import { Link } from "react-router";
import useData from "../../application/useData";
import type { Topic } from "../../application/types";

interface Props {
  topicTitle: string;
}

export default function TopicContent(props: Props) {
  const topicData = useData<Topic>({
    url: `http://localhost:3000/topic/${props.topicTitle}`,
  });
  const topicElements =
    topicData &&
    topicData.articles.map((article, index) => (
      <li key={index}>
        <Link
          to={`/topic/${props.topicTitle}/article/${article.id}/${article.title}`}
        >
          {article.title}
        </Link>
      </li>
    ));
  return (
    <>
      <h2>{props.topicTitle}</h2>
      <ul>{topicElements}</ul>
    </>
  );
}
