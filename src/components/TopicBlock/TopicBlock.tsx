import "./TopicBlock.css";
import { Link } from "react-router";
import { Topic } from "../../application/types";

interface TopicBlock {
  title: string;
  articles: { id: string; title: string }[];
}
export default function TopicBlock(props: Topic) {
  const articleElements = props.articles.map((article, index) => (
    <li key={index}>
      <Link to={`/topic/${props.title}/article/${article.id}/${article.title}`}>
        {article.title}
      </Link>
    </li>
  ));
  return (
    <div className="col-5 topic-block">
      <Link to={`/topic/${props.title}`}>
        <h2>{props.title}</h2>
      </Link>
      <ul>{articleElements}</ul>
    </div>
  );
}
