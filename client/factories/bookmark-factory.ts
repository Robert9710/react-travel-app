class BookmarkFactory {
  addBookmark(reqObj: { bookmarkId: string }) {
    const bookmarks = this.bookmarksStorage();
    if (!bookmarks.includes(reqObj.bookmarkId)) {
      bookmarks.push(reqObj.bookmarkId);
      this.bookmarksStorage({ bookmarks });
    }
  }
  removeBookmark(reqObj: { bookmarkId: string }) {
    const bookmarks = this.bookmarksStorage();
    const index = bookmarks.indexOf(reqObj.bookmarkId);
    bookmarks.splice(index, 1);
    this.bookmarksStorage({ bookmarks });
    return true;
  }
  getBookmarks(reqObj: {
    queryParams: { pagenum?: string; pagesize: string } & Record<
      string,
      string
    >;
  }) {
    const bookmarks = this.bookmarksStorage();
    if (!reqObj.queryParams.pagenum) {
      reqObj.queryParams.pagenum = "1";
    }
    return {
      bookmarks: bookmarks.slice(
        (parseInt(reqObj.queryParams.pagenum) - 1) *
          parseInt(reqObj.queryParams.pagesize),
        parseInt(reqObj.queryParams.pagenum) *
          parseInt(reqObj.queryParams.pagesize)
      ),
      bookmarksCount: bookmarks.length,
    };
  }
  isArticleBookmarked(reqObj: { articleId: string }) {
    const bookmarks = this.bookmarksStorage();
    return bookmarks.includes(reqObj.articleId);
  }
  bookmarksStorage(reqObj: { bookmarks: string[] }): void;
  bookmarksStorage(): string[];
  bookmarksStorage(reqObj?: { bookmarks: string[] }) {
    if (reqObj && reqObj.bookmarks) {
      localStorage.setItem("TABookmarks", JSON.stringify(reqObj.bookmarks));
    } else {
      const bookmarks = localStorage.getItem("TABookmarks");
      return bookmarks ? JSON.parse(bookmarks) : [];
    }
  }
}

export default new BookmarkFactory();
