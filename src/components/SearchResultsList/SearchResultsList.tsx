import {
  ArticleSearchSuggestion,
  SearchSuggestion,
} from "../../application/types";
import useData from "../../application/useData";
import "./SearchResultsList.css";
import article from "../../icons/article.svg";
import topic from "../../icons/topic.svg";
import { Link } from "react-router";

export default function SearchResultsList(props: { query: string }) {
  const searchResults = useData<SearchSuggestion[]>({
    url: `http://localhost:3000/search?q=${props.query}`,
  });
  console.log(searchResults);
  function isArticleSuggestion(
    suggestion: SearchSuggestion
  ): suggestion is ArticleSearchSuggestion {
    return (suggestion as ArticleSearchSuggestion).topicId !== undefined;
  }

  if (searchResults) {
    return (
      <div id="search-results-list">
        <div className="heading">
          <h2 className="heading-text">Search results for {props.query}</h2>
          <p className="search-results-count">
            {searchResults.length +
              (searchResults.length > 1 ? "results" : "result") +
              " found"}
          </p>
        </div>
        <ul className="search-results">
          {searchResults.map((searchResult) => (
            <li className="search-results-item-container">
              <Link
                className="search-results-item"
                to={`/topic/${
                  isArticleSuggestion(searchResult)
                    ? `${searchResult.topicId}/article/${searchResult.id}`
                    : `${searchResult.id}`
                }`}
              >
                <img
                  className="search-results-item-icon"
                  src={isArticleSuggestion(searchResult) ? article : topic}
                ></img>
                <p className="search-results-item-text">{searchResult.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
