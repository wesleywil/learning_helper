"use client";

import { useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { AppDispatch } from "@/redux/store";
import { handleHideTopicForm } from "@/redux/utils/utils";

const TopicForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="absolute min-h-screen min-w-full flex flex-col items-center justify-center bg-black/70 z-30">
      <form className="md:w-2/3 xl:w-1/3 mt-2 text-white">
        <div className="px-2 flex justify-between">
          <h3 className="text-2xl font-semibold">New Topic</h3>
          <button
            onClick={() => dispatch(handleHideTopicForm())}
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
          add topic
        </button>
      </form>
    </div>
  );
};

export default TopicForm;
