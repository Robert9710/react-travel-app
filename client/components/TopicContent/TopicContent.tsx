import "./TopicContent.css";
import { Link } from "react-router";
import articleFactory from "../../factories/article-factory";
import config from "./config.json";
import topicFactory from "../../factories/topic-factory";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

interface Props {
  topicId: string;
}

export default function TopicContent(props: Props) {
  const numberOfArticlesToShow = config.numberOfArticlesToShow;
  const { isPending: isTopicDataPending, data: topicData } = useQuery({
    queryKey: ["topic", props.topicId],
    queryFn: async () =>
      await topicFactory.getTopic({
        topicId: props.topicId,
      }),
  });
  const {
    data: topicArticlesData,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["topicArticles", props.topicId],
    queryFn: async ({ pageParam }) =>
      await articleFactory.getArticlesInTopic({
        topicId: props.topicId,
        queryParams: {
          pagenum: pageParam.toString(),
          pagesize: numberOfArticlesToShow.toString(),
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.paginationInfo.pagenum *
        lastPage.paginationInfo.pagesize <
        lastPage.paginationInfo.count
        ? lastPage.paginationInfo.pagenum + 1
        : undefined;
    },
  });
  const topicArticles = {
    articles: topicArticlesData?.pages.flatMap((page) => page.articles) || [],
    paginationInfo:
      topicArticlesData?.pages[topicArticlesData.pages.length - 1]
        .paginationInfo,
  };
  if (isTopicDataPending) {
    return (
      <div id="topic-content" className="placeholder-glow">
        <h2 className="topic-name">
          <span className="placeholder col-3"></span>
        </h2>
        <h5 className="article-count">
          <span className="placeholder col-4"></span>
        </h5>
        <ul>
          <li className="col-12">
            <span className="placeholder col-2"></span>
          </li>
          <li className="col-12">
            <span className="placeholder col-2"></span>
          </li>
          <li className="col-12">
            <span className="placeholder col-2"></span>
          </li>
          <li className="col-12">
            <span className="placeholder col-2"></span>
          </li>
          <li className="col-12">
            <span className="placeholder col-2"></span>
          </li>
        </ul>
      </div>
    );
  } else if (
    !isTopicDataPending &&
    !isFetchingNextPage &&
    topicArticles.articles?.length > 0
  ) {
    return (
      <div id="topic-content">
        <h2 className="topic-name">{topicData.topic.name}</h2>
        <h5 className="article-count">
          {topicArticles.paginationInfo?.count}&nbsp;
          {(topicArticles.paginationInfo?.count === 1
            ? "article"
            : "articles") + " in this topic"}
        </h5>
        <ul>
          {topicArticles.articles.map((article, index) => (
            <li key={index}>
              <Link
                to={`/topic/${topicData.topic.id}/article/${article.id}/${article.name}`}
              >
                {article.name}
              </Link>
            </li>
          ))}
        </ul>
        {topicArticles.paginationInfo &&
          topicArticles.articles.length <
            topicArticles.paginationInfo.count && (
            <button
              className="show-more-button"
              onClick={() => {
                fetchNextPage();
              }}
            >
              Show More
            </button>
          )}
      </div>
    );
  }
}
