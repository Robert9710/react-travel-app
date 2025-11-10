import { useRef, useState } from "react";
import "./CreateArticleForm.css";
import topicFactory from "../../factories/topic-factory";
import articleFactory from "../../factories/article-factory";
import Select, { SelectInstance, StylesConfig } from "react-select";
import AsyncSelect from "react-select/async";
import { FieldValues, useForm } from "react-hook-form";
import CreateTopicModal from "../CreateTopicModal/CreateTopicModal";

export default function CreateArticleForm() {
  const [recommendedMonths, setRecommendedMonths] = useState<null | string[]>(
    null
  );
  const [topicName, setTopicName] = useState("");
  const topicNameRef = useRef<SelectInstance<{
    value: string;
    label: string;
  }> | null>(null);
  const recommendedMonthsRef = useRef<SelectInstance<{
    value: string;
    label: string;
  }> | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const selectStyles: StylesConfig<
    {
      label: string;
      value: string;
    },
    false
  > = {
    control: (styles) => ({
      ...styles,
      boxShadow: "none",
      ":focus-within": { borderColor: "#ccc" },
    }),
    option: (styles, state) => ({
      ...styles,
      backgroundColor: state.isSelected ? "var(--lagoon-color)" : "transparent",
      ":active": { backgroundColor: "transparent" },
      ":hover": { color: !state.isSelected ? "var(--lagoon-color)" : "" },
    }),
  };
  const multiSelectStyles: StylesConfig<
    {
      label: string;
      value: string;
    },
    true
  > = {
    control: (styles) => ({
      ...styles,
      boxShadow: "none",
      ":focus-within": { borderColor: "#ccc" },
    }),
    option: (styles, state) => ({
      ...styles,
      backgroundColor: state.isSelected ? "var(--lagoon-color)" : "transparent",
      ":active": { backgroundColor: "transparent" },
      ":hover": { color: !state.isSelected ? "var(--lagoon-color)" : "" },
    }),
  };
  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];
  async function getTopics() {
    const topics = await topicFactory.getTopics();
    return topics.topics.map((topic) => ({
      value: topic.id,
      label: topic.name,
    }));
  }
  function createArticle(formData: FieldValues) {
    const articleName = formData.articleName;
    const content = formData.content;
    if (
      topicName &&
      articleName &&
      recommendedMonths &&
      recommendedMonths.length > 0 &&
      content
    ) {
      window.scrollTo(0, 0);
      topicNameRef.current?.clearValue();
      recommendedMonthsRef.current?.clearValue();
      articleFactory.createArticle({
        topicName,
        articleName,
        recommendedMonths,
        content,
      });
    }
  }
  return (
    <div id="create-article-form">
      <form noValidate onSubmit={handleSubmit(createArticle)}>
        <label>
          Topic
          <AsyncSelect
            defaultOptions
            loadOptions={getTopics}
            ref={topicNameRef}
            onChange={(selected) => selected && setTopicName(selected.value)}
            styles={selectStyles}
          />
          <button
            className="btn create-topic-button"
            onClick={(e) => {
              e.preventDefault();
            }}
            data-bs-toggle="modal"
            data-bs-target="#create-topic-modal"
          >
            Create Topic
          </button>
        </label>
        <label>
          Article Title
          <input
            type="text"
            className="form-control"
            // onKeyDown={(e) => e.preventDefault()}
            {...register("articleName", {
              required: true,
            })}
          />
          {errors.articleName && (
            <p className="validation-error">*Article title cannot be empty</p>
          )}
        </label>
        <label>
          Recommended Months
          <Select
            options={months}
            isMulti
            //@ts-ignore
            ref={recommendedMonthsRef}
            onChange={(selected) => {
              if (Array.isArray(selected)) {
                setRecommendedMonths(selected?.map((sel) => sel.value));
              }
            }}
            styles={multiSelectStyles}
          />
        </label>
        <label>
          Article Content
          <textarea
            className="form-control"
            {...register("content", { required: true })}
          />
          {errors.content && (
            <p className="validation-error">*Article content cannot be empty</p>
          )}
        </label>
        <button type="submit" className="btn create-article-button">
          Create
        </button>
      </form>
      <CreateTopicModal />
    </div>
  );
}
