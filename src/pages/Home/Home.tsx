import TopicBlocks from "../../components/TopicBlocks/TopicBlocks";
import TopicTree from "../../components/TopicTree/TopicTree";

export default function Home() {
  return (
    <div id="home" className="row">
      <div className="col-3">
        <TopicTree />
      </div>
      <div className="col-6">
        <TopicBlocks />
      </div>
      <div className="col-3"></div>
    </div>
  );
}
