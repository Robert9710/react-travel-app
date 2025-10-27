// @ts-ignore
import "./TopicContent.css";
import { Link } from "react-router";
import {
  ArticleDetails,
  PaginationInfo,
  type Topic,
} from "../../application/types";
import { useEffect, useState } from "react";
import articleFactory from "../../factories/article-factory";
import config from "./config.json";

interface Props {
  topic: Topic;
}

export default function TopicContent(props: Props) {
  const numberOfArticlesToShow = config.numberOfArticlesToShow;
  const [pagenum, setPagenum] = useState(1);
  const [topicArticles, setTopicArticles] = useState<ArticleDetails[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>();
  useEffect(() => {
    articleFactory
      .getArticlesInTopic({
        topicId: props.topic.id,
        pagenum: pagenum,
        pagesize: numberOfArticlesToShow,
      })
      .then((data) => {
        setTopicArticles((oldTopicArticles) =>
          oldTopicArticles?.concat(data.articles)
        );
        setPaginationInfo(data.paginationInfo);
      });
  }, [numberOfArticlesToShow, pagenum, props.topic.id]);
  if (topicArticles && topicArticles.length > 0) {
    return (
      <div id="topic-content">
        <h2 className="topic-name">{props.topic && props.topic.name}</h2>
        <h5 className="article-count">
          {paginationInfo?.count}&nbsp;
          {(paginationInfo && paginationInfo.count > 1
            ? "articles"
            : "article") + " in this topic"}
        </h5>
        <ul>
          {topicArticles.map((article, index) => (
            <li key={index}>
              <Link
                to={`/topic/${props.topic.id}/article/${article.id}/${article.name}`}
              >
                {article.name}
              </Link>
            </li>
          ))}
        </ul>
        {paginationInfo && topicArticles.length < paginationInfo.count && (
          <button
            className="show-more-button"
            onClick={() => setPagenum((oldPagenum) => oldPagenum + 1)}
          >
            Show More
          </button>
        )}
      </div>
    );
  }
}
