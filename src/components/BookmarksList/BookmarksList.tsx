import bookmarkFactory from "../../factories/bookmark-factory";
import removeIcon from "../../icons/remove.svg";
import "./BookmarksList.css";
import Bookmark from "../Bookmark/Bookmark";
import { useState } from "react";

export default function BookmarksList() {
  const [bookmarks, setBookmarks] = useState(() =>
    bookmarkFactory.bookmarksStorage()
  );
  function removeBookmark(bookmarkId: string) {
    bookmarkFactory.removeBookmark({ bookmarkId: bookmarkId });
    setBookmarks(bookmarkFactory.bookmarksStorage());
  }

  return (
    <div id="bookmarks-list">
      <h3>Bookmarks</h3>
      {bookmarks.length > 0 ? (
        <ul className="bookmarks-list">
          {bookmarks.map((bookmark) => (
            <li className="bookmarks-list-item-container" key={bookmark}>
              <Bookmark articleId={bookmark} />
              <button
                className="bookmarks-list-item-remove-button"
                onClick={() => removeBookmark(bookmark)}
              >
                <img className="remove-bookmark-icon" src={removeIcon}></img>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <span>No Bookmarks</span>
        </div>
      )}
    </div>
  );
}
