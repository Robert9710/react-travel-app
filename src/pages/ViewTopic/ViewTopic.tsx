import { useNavigate, useParams } from "react-router";
import TopicContent from "../../components/TopicContent/TopicContent";

export default function ViewTopic() {
  const { topicName } = useParams();
  const navigate = useNavigate();
  if (!topicName) {
    navigate("./error-page");
  } else
    return (
      <>
        <div className="col-3"></div>
        <div className="col-6">
          <TopicContent topicName={topicName} />
        </div>
      </>
    );
}
