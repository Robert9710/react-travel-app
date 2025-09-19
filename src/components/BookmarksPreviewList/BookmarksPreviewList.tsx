import bookmarkFactory from "../../factories/bookmark-factory";
import "./BookmarksPreviewList.css";
import Bookmark from "../Bookmark/Bookmark";

export default function BookmarksPreviewList() {
  const bookmarks = bookmarkFactory.bookmarksStorage();
  return (
    <div id="bookmarks-preview-list">
      <h3>Bookmarks</h3>
      {bookmarks.length > 0 ? (
        <ul className="bookmarks-list">
          {bookmarks.map((bookmark) => (
            <li className="bookmarks-list-item-container" key={bookmark}>
              <Bookmark articleId={bookmark} />
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
