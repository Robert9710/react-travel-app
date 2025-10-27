import "./SearchResultsList.css";

import article from "../../icons/article.svg";

import topic from "../../icons/topic.svg";
import { Link } from "react-router";
import { useState } from "react";
import searchFactory from "../../factories/search-factory";
import config from "./config.json";
import Pagination from "../Pagination/Pagination";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";

export default function SearchResultsList(props: { query: string }) {
  const numberOfSearchResultsPerPage = config.numberOfSearchResultsPerPage;
  const [pagenum, setPagenum] = useState(1);

  const { isPending, data: searchResults } = useQuery({
    queryKey: ["searchResultsData", props.query, pagenum],
    queryFn: async () =>
      await searchFactory.getSearchResults({
        query: props.query,
        pagenum: pagenum,
        pagesize: numberOfSearchResultsPerPage,
      }),
  });

  if (isPending) {
    return <Loader />;
  }
  if (searchResults) {
    return (
      <div id="search-results-list">
        <div className="heading">
          <h2 className="heading-text">Search results for {props.query}</h2>
          <p className="search-results-count">
            {searchResults.paginationInfo.count +
              " " +
              (searchResults.paginationInfo.count > 1 ? "results" : "result") +
              " found"}
          </p>
        </div>
        <ul className="search-results">
          {searchResults.articles?.map((searchResult) => (
            <li className="search-results-item-container" key={searchResult.id}>
              <Link
                className="search-results-item"
                to={`/topic/${searchResult.topicId}/article/${searchResult.id}`}
              >
                <img className="search-results-item-icon" src={article}></img>
                <p className="search-results-item-text">{searchResult.name}</p>
              </Link>
            </li>
          ))}
          {searchResults.topics?.map((searchResult) => (
            <li className="search-results-item-container" key={searchResult.id}>
              <Link
                className="search-results-item"
                to={`/topic/${searchResult.id}`}
              >
                <img className="search-results-item-icon" src={topic}></img>
                <p className="search-results-item-text">{searchResult.name}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Pagination
          totalNumberOfItems={searchResults.paginationInfo.count}
          numberOfItemsPerPage={numberOfSearchResultsPerPage}
          pagenum={pagenum}
          setPagenum={setPagenum}
        />
      </div>
    );
  }
}
