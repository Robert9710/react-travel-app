import BookmarksPreviewList from "../../components/BookmarksPreviewList/BookmarksPreviewList";
import TopicBlocks from "../../components/TopicBlocks/TopicBlocks";

export default function Home() {
  return (
    <div id="home" className="row">
      <div className="col-9">
        <TopicBlocks />
      </div>
      <div className="col-3">
        <BookmarksPreviewList />
      </div>
    </div>
  );
}
