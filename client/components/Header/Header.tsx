import { Link, useNavigate } from "react-router";
import homeIcon from "../../icons/home.svg";
import menuIcon from "../../icons/menu.svg";
import article from "../../icons/article.svg";
import topic from "../../icons/topic.svg";
import "./Header.css";
import { useContext, useState } from "react";
import { SearchSuggestions } from "../../application/types";
import searchFactory from "../../factories/search-factory";
import config from "./config.json";
import { AuthContext, AuthSetContext } from "../../contexts/AuthContext";
import userFactory from "../../factories/user-factory";

export default function Header() {
  const showBookmarksLink = config.showBookmarksLink;
  const showCreateArticleLink = config.showCreateArticleLink;
  const user = useContext(AuthContext);
  const setUser = useContext(AuthSetContext);
  return (
    <div id="header">
      {/* Home Link */}
      <div className="logo-container">
        <Link to="/">
          <img className="home-icon" src={homeIcon}></img>
        </Link>
      </div>
      {/* Search field */}
      <SearchField />
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
          {!user && (
            <li className="dropdown-item">
              <Link to="/login">Log In/Register</Link>
            </li>
          )}
          {user && (
            <li className="dropdown-item">
              {showCreateArticleLink && (
                <Link to="/create">Create Article</Link>
              )}
            </li>
          )}
          <li className="dropdown-item">
            {showBookmarksLink && <Link to="/bookmarks">Bookmarks</Link>}
          </li>
          {user && (
            <li className="dropdown-item">
              <Link
                to=""
                onClick={() => {
                  userFactory.logout();
                  sessionStorage.removeItem("username");
                  setUser(null);
                }}
              >
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

function SearchField() {
  const searchSuggestionsMaxCount = config.searchSuggestionsMaxCount;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] =
    useState<SearchSuggestions>();
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  async function getSearchSuggestions(query: string) {
    setSearchSuggestions(
      await searchFactory.getSearchSuggestions({
        queryParams: { query, maxCount: searchSuggestionsMaxCount.toString() },
      })
    );
  }
  function updateSearchQuery(newQuery: string) {
    setSearchQuery(newQuery);
    if (newQuery.length >= 2) {
      getSearchSuggestions(newQuery);
    } else {
      setSearchSuggestions(undefined);
    }
  }
  function performSearch() {
    if (searchQuery) {
      setSearchSuggestions(undefined);
      navigate(`/search?query=${searchQuery}`);
    }
  }

  return (
    <div id="search-field" className=" col-md-4 mx-auto">
      <div className="input-group">
        <label className="form-control-label">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => updateSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && performSearch()}
            onBlur={() => setShowSearchSuggestions(false)}
            onFocus={() => setShowSearchSuggestions(true)}
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
        {showSearchSuggestions &&
          searchSuggestions &&
          (searchSuggestions?.topics.length > 0 ||
            searchSuggestions?.articles.length > 0) && (
            <ul className="search-suggestions-dropdown">
              {searchSuggestions.articles.map((suggestion, index) => (
                <li
                  className="search-suggestions-dropdown-item-container"
                  key={index}
                >
                  <Link
                    className="search-suggestions-dropdown-item"
                    to={`/topic/${suggestion.topicId}/article/${suggestion.id}`}
                    onClick={() => {
                      setSearchQuery("");
                      setSearchSuggestions(undefined);
                    }}
                  >
                    <img
                      className="search-suggestions-dropdown-item-icon"
                      src={article}
                    ></img>
                    <p className="search-suggestions-dropdown-item-text">
                      {suggestion.name}
                    </p>
                  </Link>
                </li>
              ))}
              {searchSuggestions.topics.map((suggestion, index) => (
                <li
                  className="search-suggestions-dropdown-item-container"
                  key={index}
                >
                  <Link
                    className="search-suggestions-dropdown-item"
                    to={`/topic/${suggestion.id}`}
                    onClick={() => {
                      setSearchQuery("");
                      setSearchSuggestions(undefined);
                    }}
                  >
                    <img
                      className="search-suggestions-dropdown-item-icon"
                      src={topic}
                    ></img>
                    <p className="search-suggestions-dropdown-item-text">
                      {suggestion.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
}
