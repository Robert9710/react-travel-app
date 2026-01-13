import bookmarkFactory from "../../factories/bookmark-factory";
import "./BookmarksList.css";
import Bookmark from "../Bookmark/Bookmark";
import { useState } from "react";
import config from "./config.json";
import Pagination from "../Pagination/Pagination";
import { useQuery } from "@tanstack/react-query";
import removeIcon from "../../icons/remove.svg";

export default function BookmarksList() {
  const numberOfBookmarksPerPage = config.numberOfBookmarksPerPage;
  const [pagenum, setPagenum] = useState(1);
  const { refetch, data: bookmarks } = useQuery({
    queryKey: ["bookmarksData", pagenum],
    queryFn: () =>
      bookmarkFactory.getBookmarks({
        queryParams: {
          pagenum: pagenum.toString(),
          pagesize: numberOfBookmarksPerPage.toString(),
        },
      }),
  });

  function removeBookmark(bookmarkId: string) {
    const bookmarkRemoved = bookmarkFactory.removeBookmark({
      bookmarkId: bookmarkId,
    });
    if (bookmarkRemoved && bookmarks?.bookmarks.length === 1 && pagenum > 1) {
      setPagenum((oldPagenum) => oldPagenum - 1);
    }
    refetch();
  }

  if (bookmarks) {
    return (
      <div id="bookmarks-list">
        <h3>Bookmarks</h3>
        {bookmarks.bookmarksCount > 0 ? (
          <ul className="bookmarks-list">
            {bookmarks.bookmarks.map((bookmark) => (
              <li className="bookmarks-list-item-container" key={bookmark}>
                <Bookmark articleId={bookmark}>
                  <RemoveBookmarkButton
                    articleId={bookmark}
                    removeBookmark={removeBookmark}
                  />
                </Bookmark>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <span>No Bookmarks</span>
          </div>
        )}
        <Pagination
          totalNumberOfItems={bookmarks.bookmarksCount}
          numberOfItemsPerPage={numberOfBookmarksPerPage}
          pagenum={pagenum}
          setPagenum={setPagenum}
        />
      </div>
    );
  }
}

function RemoveBookmarkButton(props: {
  articleId: string;
  removeBookmark: (bookmarkId: string) => void;
}) {
  return (
    <button
      className="bookmarks-list-item-remove-button"
      onClick={() => props.removeBookmark(props.articleId)}
    >
      <img className="remove-bookmark-icon" src={removeIcon}></img>
    </button>
  );
}
