import { useNavigate, useParams } from "react-router";
import TopicContent from "../../components/TopicContent/TopicContent";

export default function ViewTopic() {
  const { topicTitle } = useParams();
  const navigate = useNavigate();
  if (!topicTitle) {
    navigate("./error-page");
  } else
    return (
      <div id="view-topic" className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <TopicContent topicTitle={topicTitle} />
        </div>
      </div>
    );
}
