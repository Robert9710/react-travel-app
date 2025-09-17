import { useNavigate, useParams } from "react-router";
import TopicContent from "../../components/TopicContent/TopicContent";

export default function ViewTopic() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  if (!topicId) {
    navigate("./error-page");
  } else
    return (
      <div id="view-topic" className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <TopicContent topicId={topicId} />
        </div>
      </div>
    );
}
