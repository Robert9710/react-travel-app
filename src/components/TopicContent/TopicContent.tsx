import "./TopicContent.css";
import { Link } from "react-router";
import useData from "../../application/useData";
import type { Topic } from "../../application/types";

interface Props {
  topicName: string;
}

export default function TopicContent(props: Props) {
  const topicData: Topic = useData({
    url: `http://localhost:3000/topic/${props.topicName}`,
  });
  const topicElements =
    topicData.articles &&
    topicData.articles.map((article, index) => (
      <li key={index}>
        <Link
          to={`/topic/${props.topicName}/article/${article.id}/${article.title}`}
        >
          {article.title}
        </Link>
      </li>
    ));
  return (
    <>
      <h2>{props.topicName}</h2>
      <ul>{topicElements}</ul>
    </>
  );
}
