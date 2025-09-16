import { Link, useNavigate } from "react-router";
import homeIcon from "../../icons/home.svg";
import menuIcon from "../../icons/menu.svg";
import article from "../../icons/article.svg";
import topic from "../../icons/topic.svg";
import "./Header.css";
import { useState } from "react";
import {
  ArticleSearchSuggestion,
  SearchSuggestion,
} from "../../application/types";
export default function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<
    SearchSuggestion[]
  >([]);
  async function getSearchSuggestions(query: string) {
    const response = await fetch(
      `http://localhost:3000/search/suggestions?q=${query}`
    );
    setSearchSuggestions((await response.json()).suggestions);
  }
  function updateSearchQuery(newQuery: string) {
    setSearchQuery(newQuery);
    if (newQuery.length >= 2) {
      getSearchSuggestions(newQuery);
    } else {
      setSearchSuggestions([]);
    }
  }
  function performSearch() {
    if (searchQuery) {
      setSearchSuggestions([]);
      navigate(`/search?query=${searchQuery}`);
    }
  }
  function isArticleSuggestion(
    suggestion: SearchSuggestion
  ): suggestion is ArticleSearchSuggestion {
    return (suggestion as ArticleSearchSuggestion).topicId !== undefined;
  }

  return (
    <div id="header">
      {/* Home Link */}
      <div>
        <Link to="/">
          <img className="home-icon" src={homeIcon}></img>
        </Link>
      </div>
      {/* Search field */}
      <div className="input-group">
        <label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => updateSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && performSearch()}
            className="form-control"
          />
        </label>
        <button
          type="submit"
          onClick={performSearch}
          className="btn btn-outline-secondary"
        >
          Search
        </button>
        {/* Search suggestions list*/}
        <ul className="search-suggestions-dropdown">
          {searchSuggestions.map((suggestion, index) => (
            <li
              className="search-suggestions-dropdown-item-container"
              key={index}
            >
              <Link
                className="search-suggestions-dropdown-item"
                to={`/topic/${
                  isArticleSuggestion(suggestion)
                    ? `${suggestion.topicId}/article/${suggestion.id}`
                    : `${suggestion.id}`
                }`}
                onClick={() => {
                  setSearchQuery("");
                  setSearchSuggestions([]);
                }}
              >
                <img
                  className="search-suggestions-dropdown-item-icon"
                  src={isArticleSuggestion(suggestion) ? article : topic}
                ></img>
                <p className="search-suggestions-dropdown-item-text">
                  {suggestion.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Menu */}
      <div id="header-menu" className="input-group-prepend">
        <button
          type="button"
          className="dropdown-toogle"
          data-bs-toggle="dropdown"
        >
          <img className="menu-icon" src={menuIcon}></img>
        </button>
        <ul className="dropdown-menu">
          <li className="dropdown-item">
            <Link to="/">Home</Link>
          </li>
          <li className="dropdown-item">
            <Link to="/create">Create Article</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
