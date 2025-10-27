import bookmarkFactory from "../../factories/bookmark-factory";
// @ts-ignore
import removeIcon from "../../icons/remove.svg";
// @ts-ignore
import "./BookmarksList.css";
import Bookmark from "../Bookmark/Bookmark";
import { useEffect, useState } from "react";
import config from "./config.json";
import Pagination from "../Pagination/Pagination";

export default function BookmarksList() {
  const numberOfBookmarksPerPage = config.numberOfBookmarksPerPage;
  const [pagenum, setPagenum] = useState(1);
  const [totalNumberOfBookmarks, setTotalNumberOfBookmarks] = useState(0);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  useEffect(() => getBookmarks(), [pagenum]);
  function removeBookmark(bookmarkId: string) {
    const bookmarkRemoved = bookmarkFactory.removeBookmark({
      bookmarkId: bookmarkId,
    });
    if (bookmarkRemoved && bookmarks.length === 1 && pagenum > 1) {
      setPagenum((oldPagenum) => oldPagenum - 1);
    }
    getBookmarks();
  }
  function getBookmarks() {
    const bookmarks = bookmarkFactory.getBookmarks({
      pagenum: pagenum,
      pagesize: numberOfBookmarksPerPage,
    });
    setBookmarks(bookmarks.bookmarks);
    setTotalNumberOfBookmarks(bookmarks.bookmarksCount);
  }

  return (
    <div id="bookmarks-list">
      <h3>Bookmarks</h3>
      {totalNumberOfBookmarks > 0 ? (
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
      <Pagination
        totalNumberOfItems={totalNumberOfBookmarks}
        numberOfItemsPerPage={numberOfBookmarksPerPage}
        pagenum={pagenum}
        setPagenum={setPagenum}
      />
    </div>
  );
}
