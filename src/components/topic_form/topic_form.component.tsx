"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import type { AppDispatch, RootState } from "@/redux/store";
import { handleHideTopicForm } from "@/redux/utils/utils";
import { Topic } from "@/utils/interfaces";
import { createTopic } from "@/redux/topics/topics";

const TopicForm = () => {
  const status = useSelector((state: RootState) => state.sections.section);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      title: { value: string };
      description: { value: string };
    };

    const data: Topic = {
      title: target.title.value,
      description: target.description.value,
      status: status,
    };

    dispatch(createTopic(data));
    dispatch(handleHideTopicForm());
  };
  return (
    <div className="absolute min-h-screen min-w-full flex flex-col items-center justify-center bg-[#371e30]/70 z-30">
      <form
        onSubmit={handleSubmit}
        className="md:w-2/3 xl:w-1/3 mt-2 text-[#edf0ef]"
      >
        <div className="px-2 flex justify-between">
          <h3 className="text-2xl font-semibold">New Topic</h3>
          <button
            onClick={() => dispatch(handleHideTopicForm())}
            className="text-xl hover:text-[#f6603b] transform duration-700 ease-in-out"
          >
            <FaTimes />
          </button>{" "}
        </div>
        <div className="w-full flex flex-col gap-2 text-black">
          <input
            type="text"
            name="title"
            placeholder="Topic Title"
            required
            className="px-2 py-1 rounded"
          />
          <textarea
            name="description"
            className="px-2 py-1 rounded"
            placeholder="Topic Description/Info"
            required
            rows={5}
          ></textarea>
        </div>

        <button
          type="submit"
          className="mt-2 px-2 font-semibold text-[#edf0ef] bg-[#f6603b] hover:bg-red-500 transform duration-500 ease-in-out rounded"
        >
          add topic
        </button>
      </form>
    </div>
  );
};

export default TopicForm;
