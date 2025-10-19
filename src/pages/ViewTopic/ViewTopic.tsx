import { useLoaderData, useNavigate, useParams } from "react-router";
import TopicContent from "../../components/TopicContent/TopicContent";
import TopicTree from "../../components/TopicTree/TopicTree";

export default function ViewTopic() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = useLoaderData();
  if (!topicId) {
    navigate("./error-page");
  } else
    return (
      <div id="view-topic" className="row">
        <div className="col-3">
          <TopicTree />
        </div>
        <div className="col-6">
          <TopicContent topic={topic.topic} />
        </div>
      </div>
    );
}
