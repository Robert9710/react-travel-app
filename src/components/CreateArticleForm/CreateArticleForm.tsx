import { useEffect, useState } from "react";
import { Topics } from "../../application/types";
import "./CreateArticleForm.css";
export default function CreateArticleForm() {
  const [topics, setTopics] = useState<Topics | null>(null);
  // const topicsData = useData<Topics>({
  //   url: "http://localhost:3000/topics",
  // });
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
    topics.topics.map((topic, index) => (
      <option key={index} value={topic.title}>
        {topic.title}
      </option>
    ));
  const monthsOptions = months.map((month, index) => (
    <option key={index} value={month}>
      {month}
    </option>
  ));
  function getTopics() {
    return fetch("http://localhost:3000/topics")
      .then((response) => response.json())
      .then((data) => setTopics(data));
  }
  async function createArticle(formData: FormData) {
    window.scrollTo(0, 0);
    await fetch("http://localhost:3000/create/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topicName: formData.get("topicTitle"),
        title: formData.get("articleTitle"),
        recommended: formData.get("recommendedMonth"),
        content: formData.get("content"),
      }),
    });
  }
  function createNewTopic(formData: FormData) {
    fetch("http://localhost:3000/create/topic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topicName: formData.get("newTopicTitle"),
      }),
    });
    getTopics();
  }
  return (
    <div id="create-article-form">
      <form action={createArticle}>
        <label>
          Topic
          <select className="form-control" name="topicTitle">
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
          Article Title
          <input className="form-control" type="text" name="articleTitle" />
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
                    id="new-topic-title"
                    className="form-control"
                    type="text"
                    name="newTopicTitle"
                  />
                </label>
                <button type="submit" className="btn btn-primary">
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
