import { FieldValues, useForm } from "react-hook-form";
import topicFactory from "../../factories/topic-factory";

export default function CreateTopicModal() {
  const { register, handleSubmit } = useForm();
  function createNewTopic(formData: FieldValues) {
    const topicName = formData.topicName;
    if (topicName) {
      topicFactory.createTopic({ newTopicName: topicName });
    }
  }
  return (
    <div
      className="modal fade"
      id="create-topic-modal"
      aria-labelledby="createTopicModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="create-topic-modal-title">
              Create New Topic
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={handleSubmit(createNewTopic)}>
            <div className="modal-body">
              <label>
                Topic Name
                <input
                  type="text"
                  id="new-topic-name"
                  className="form-control"
                  {...register("topicName")}
                />
              </label>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Create Topic
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
