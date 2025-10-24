import "./ArticleActions.css";
import bookmarkIcon from "../../icons/bookmark.svg";
import removeBookmarkIcon from "../../icons/remove-bookmark.svg";
import bookmarkFactory from "../../factories/bookmark-factory";
import { useEffect, useState } from "react";
import config from "./config.json";

export default function ArticleActions(props: { articleId: string }) {
  const showBookmarkButton = config.showBookmarkButton;
  const [isArticleBookmarked, setIsArticleBookmarked] = useState(() =>
    bookmarkFactory.isArticleBookmarked({ articleId: props.articleId })
  );
  useEffect(() => {
    setIsArticleBookmarked(
      bookmarkFactory.isArticleBookmarked({ articleId: props.articleId })
    );
  }, [props.articleId]);
  function addBookmark() {
    bookmarkFactory.addBookmark({ bookmarkId: props.articleId });
    setIsArticleBookmarked(
      bookmarkFactory.isArticleBookmarked({ articleId: props.articleId })
    );
  }
  function removeBookmark() {
    bookmarkFactory.removeBookmark({ bookmarkId: props.articleId });
    setIsArticleBookmarked(
      bookmarkFactory.isArticleBookmarked({ articleId: props.articleId })
    );
  }

  return (
    <div id="article-actions">
      {showBookmarkButton &&
        (!isArticleBookmarked ? (
          <button onClick={addBookmark}>
            <img className="bookmark-icon" src={bookmarkIcon}></img>
          </button>
        ) : (
          <button onClick={removeBookmark}>
            <img
              className="remove-bookmark-icon"
              src={removeBookmarkIcon}
            ></img>
          </button>
        ))}
    </div>
  );
}
