"use client";

import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import type { AppDispatch, RootState } from "@/redux/store";
import {
  handleHideSubTopicForm,
  handleHideSubTopicsContainer,
} from "@/redux/utils/utils";
import { SubTopic } from "@/utils/interfaces";
import { createSubTopic } from "@/redux/sub_topics/sub_topics";

const SubTopicForm = () => {
  const topic = useSelector((state: RootState) => state.topics.topic);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      title: { value: string };
      description: { value: string };
    };

    const data: SubTopic = {
      title: target.title.value,
      description: target.description.value,
      finished: false,
      topicId: topic.id!,
    };
    dispatch(createSubTopic(data));
    dispatch(handleHideSubTopicsContainer());
    // window.location.reload();
  };
  return (
    <form onSubmit={handleSubmit} className="mt-2 text-white">
      <div className="px-2 flex justify-between">
        <h3 className="text-2xl font-semibold">New Sub-Topic</h3>
        <button
          onClick={() => dispatch(handleHideSubTopicForm())}
          className="text-xl hover:text-red-400 transform duration-700 ease-in-out"
        >
          <FaTimes />
        </button>{" "}
      </div>
      <div className="w-full flex flex-col gap-2 text-black">
        <input
          type="text"
          name="title"
          placeholder="Sub Topic Title"
          className="px-2 py-1 rounded"
        />
        <textarea
          name="description"
          className="px-2 py-1 rounded"
          placeholder="Sub Topic Description/Info"
          rows={5}
        ></textarea>
      </div>

      <button
        type="submit"
        className="mt-2 px-2 font-semibold text-white bg-red-500 hover:bg-red-700 transform duration-500 ease-in-out rounded"
      >
        add sub topic
      </button>
    </form>
  );
};

export default SubTopicForm;
