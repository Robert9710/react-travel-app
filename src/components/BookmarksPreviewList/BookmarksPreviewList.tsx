import bookmarkFactory from "../../factories/bookmark-factory";
import "./BookmarksPreviewList.css";
import Bookmark from "../Bookmark/Bookmark";
import config from "./config.json";
import { Link } from "react-router";

export default function BookmarksPreviewList() {
  const numberOfBookmarksToShow = config.numberOfBookmarksToShow;
  const { bookmarks, bookmarksCount } = bookmarkFactory.getBookmarks({
    pagesize: numberOfBookmarksToShow,
  });
  return (
    <div id="bookmarks-preview-list">
      <h3>Bookmarks</h3>
      {bookmarksCount > 0 ? (
        <>
          <ul className="bookmarks-list">
            {bookmarks.map((bookmark) => (
              <li className="bookmarks-list-item-container" key={bookmark}>
                <Bookmark articleId={bookmark} />
              </li>
            ))}
          </ul>
          {bookmarksCount > numberOfBookmarksToShow && (
            <Link to="/bookmarks">Show All</Link>
          )}
        </>
      ) : (
        <div>
          <span>No Bookmarks</span>
        </div>
      )}
    </div>
  );
}
