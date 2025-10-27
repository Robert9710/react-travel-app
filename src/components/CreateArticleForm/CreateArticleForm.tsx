import { useEffect, useState } from "react";
import { Topics } from "../../application/types";
// @ts-ignore
import "./CreateArticleForm.css";
import topicFactory from "../../factories/topic-factory";
import articleFactory from "../../factories/article-factory";
export default function CreateArticleForm() {
  const [topics, setTopics] = useState<Topics | null>(null);
  useEffect(() => {
    getTopics();
  }, []);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const topicOptions =
    topics &&
    topics.topics.map((topic) => (
      <option key={topic.id} value={topic.id}>
        {topic.name}
      </option>
    ));
  const monthsOptions = months.map((month, index) => (
    <option key={index} value={month}>
      {month}
    </option>
  ));
  async function getTopics() {
    setTopics(await topicFactory.getTopics());
  }
  async function createArticle(formData: FormData) {
    window.scrollTo(0, 0);
    const topicName = formData.get("topicName")?.toString();
    const articleName = formData.get("articleName")?.toString();
    const recommendedMonth = formData.get("recommendedMonth")?.toString();
    const content = formData.get("content")?.toString();
    if (topicName && articleName && recommendedMonth && content) {
      articleFactory.createArticle({
        topicName: topicName,
        articleName: articleName,
        recommendedMonth: recommendedMonth,
        content: content,
      });
    } else {
      //Show error message
    }
  }
  async function createNewTopic(formData: FormData) {
    const topicName = formData.get("topicName")?.toString();
    if (topicName) {
      topicFactory.createTopic({ newTopicName: topicName });
      await getTopics();
    }
  }
  return (
    <div id="create-article-form">
      <form action={createArticle}>
        <label>
          Topic
          <select className="form-control" name="topicName">
            {topicOptions}
          </select>
          <button
            className="btn btn-outline-secondary"
            onClick={(e) => e.preventDefault()}
            data-bs-toggle="modal"
            data-bs-target="#create-topic-modal"
          >
            Create Topic
          </button>
        </label>
        <label>
          Article Name
          <input className="form-control" type="text" name="articleName" />
        </label>
        <label>
          Recommended Month
          <select className="form-control" name="recommendedMonth">
            {monthsOptions}
          </select>
        </label>
        <label>
          Article Content
          <textarea className="form-control" name="content" />
        </label>
        <button type="submit" className="btn btn-outline-secondary">
          Create
        </button>
      </form>
      {/* Modal */}
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
            <div className="modal-body">
              <form action={createNewTopic}>
                <label>
                  Topic Name
                  <input
                    id="new-topic-name"
                    className="form-control"
                    type="text"
                    name="newTopicName"
                  />
                </label>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Create Topic
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
