"use client";

import { useDispatch, useSelector } from "react-redux";
import { FaTimes, FaPlus } from "react-icons/fa";
import type { AppDispatch, RootState } from "@/redux/store";
import {
  handleHideSubTopicsContainer,
  handleHideSubTopicForm,
} from "@/redux/utils/utils";

import SubTopicDetails from "../sub_topic_details/sub_topic_details.component";
import SubTopicForm from "../sub_topic_form/sub_topic_form.component";

const SubTopicsContainer = () => {
  const hideForm = useSelector(
    (state: RootState) => state.utils.hide_sub_topic_form
  );
  const topic = useSelector((state: RootState) => state.topics.topic);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="absolute min-h-screen min-w-full flex flex-col items-center justify-center bg-black/70 z-10">
      <button
        onClick={() => dispatch(handleHideSubTopicsContainer())}
        className="p-2 font-semibold text-5xl text-white hover:bg-red-600 border-2 border-white hover:border-red-600 rounded-full transform duration-700 ease-in-out"
      >
        <FaTimes />
      </button>
      <div className="mt-8 flex gap-2">
        <button
          onClick={() => dispatch(handleHideSubTopicForm())}
          className="p-2 font-semibold text-xl bg-red-400 hover:bg-red-600 text-white rounded-full transform duration-500 ease-in-out"
        >
          <FaPlus />
        </button>
        <h2 className="text-3xl font-bold text-white">{topic.title}</h2>
      </div>

      <div className="px-2 md:w-4/5 xl:w-1/3 h-[35rem] flex flex-col gap-2 overflow-y-auto">
        {hideForm ? "" : <SubTopicForm />}
        {topic.sub_topics?.length ? (
          topic.sub_topics?.map((item) => <SubTopicDetails subTopic={item} />)
        ) : (
          <h1 className="py-8 text-3xl text-white font-semibold text-center">
            No Sub Topics Added
          </h1>
        )}
      </div>
    </div>
  );
};

export default SubTopicsContainer;
