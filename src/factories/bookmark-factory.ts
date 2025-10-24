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
  getBookmarks(reqObj: { pagenum?: number; pagesize: number }) {
    const bookmarks = this.bookmarksStorage();
    return {
      bookmarks: bookmarks.slice(
        ((reqObj.pagenum || 1) - 1) * reqObj.pagesize,
        (reqObj.pagenum || 1) * reqObj.pagesize
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
