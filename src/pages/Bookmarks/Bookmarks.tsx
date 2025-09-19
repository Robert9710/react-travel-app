import BookmarksList from "../../components/BookmarksList/BookmarksList";
import TopicTree from "../../components/TopicTree/TopicTree";

export default function Bookmarks() {
  return (
    <div id="bookmarks" className="row">
      <div className="col-3">
        <TopicTree />
      </div>
      <div className="col-9">
        <BookmarksList />
      </div>
    </div>
  );
}
