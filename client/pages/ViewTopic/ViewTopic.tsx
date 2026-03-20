import { useNavigate, useParams } from "react-router";
import TopicContent from "../../components/TopicContent/TopicContent";
import TopicTree from "../../components/TopicTree/TopicTree";

export default function ViewTopic() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  if (!topicId) {
    navigate("./error-page");
  } else
    return (
      <div id="view-topic" className="row">
        <div className="col-3 d-none d-sm-block">
          <TopicTree />
        </div>
        <div className="col-6">
          <TopicContent topicId={topicId} />
        </div>
      </div>
    );
}
