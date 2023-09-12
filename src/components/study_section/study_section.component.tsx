"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDoubleDown, FaAngleDoubleUp, FaPlus } from "react-icons/fa";
import type { AppDispatch, RootState } from "@/redux/store";
import { handleHideTopicForm } from "@/redux/utils/utils";
import { setSection } from "@/redux/sections/sections";
import { capitalizeWords } from "@/utils/utils";
import { Status } from "@/utils/interfaces";

import StudySectionTopic from "../study_section_topic/study_section_topic.component";

type StudySectionProps = {
  name: Status;
  bgColor: string;
};

const StudySection = ({ name, bgColor }: StudySectionProps) => {
  const [fullScreen, setFullScreen] = useState<boolean>(false);

  const topics = useSelector((state: RootState) => state.topics.topics);
  const dispatch = useDispatch<AppDispatch>();

  const style = {
    height: fullScreen ? "100vh" : "fit-content",
    backgroundColor: bgColor,
  };

  const handleHideForm = () => {
    dispatch(setSection(name));
    dispatch(handleHideTopicForm());
  };

  return (
    <div
      style={style}
      className={`md:w-[85vw] xl:w-[60vw] py-4  flex flex-col rounded overflow-hidden`}
    >
      <div className="w-full px-4 pb-1 flex justify-between border-b-2 border-black">
        <div className="flex gap-2 items-center">
          <button
            onClick={handleHideForm}
            className="p-2 bg-black hover:bg-gray-700 text-white font-bold rounded-full"
          >
            <FaPlus />
          </button>
          <h2 className="text-xl font-semibold">{capitalizeWords(name)}</h2>
        </div>

        <button
          onClick={() => setFullScreen(!fullScreen)}
          className="p-2 font-semibold bg-black hover:bg-slate-700 text-white hover:text-slate-200 rounded"
        >
          {fullScreen ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
        </button>
      </div>
      <div className="px-4 gap-2">
        {topics.length
          ? topics
              .filter((item) => item.status === name)
              .map((item) => <StudySectionTopic key={item.id} topic={item} />)
          : ""}
      </div>
    </div>
  );
};

export default StudySection;
