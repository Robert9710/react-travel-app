import TopicBlocks from "../../components/TopicBlocks/TopicBlocks";

export default function Home() {
  return (
    <div id="home" className="row">
      <div className="col-3"></div>
      <div className="col-6">
        <TopicBlocks />
      </div>
      <div className="col-3"></div>
    </div>
  );
}
