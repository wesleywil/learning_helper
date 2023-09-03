"use client";

import { useState } from "react";
import { FaAngleDoubleDown, FaAngleDoubleUp, FaPlus } from "react-icons/fa";
import StudySectionTopic from "../../app/components/study_section_topic/study_section_topic.component";
import StudySubTopic from "../../app/components/study_sub_topic/study_sub_topic.component";

type StudySectionProps = {
  name: string;
  bgColor: string;
};

const StudySection = ({ name, bgColor }: StudySectionProps) => {
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  return (
    <div
      style={fullScreen ? { height: "100vh" } : { minHeight: "fit-content" }}
      className={`w-[95vh] py-4  flex flex-col bg-${bgColor}/50 rounded overflow-hidden`}
    >
      <div className="w-full px-4 pb-1 flex justify-between border-b-2 border-black">
        <div className="flex gap-2 items-center">
          <button className="p-2 bg-black hover:bg-gray-700 text-white font-bold rounded-full">
            <FaPlus />
          </button>
          <h2 className="text-xl font-semibold">{name}</h2>
        </div>

        <button
          onClick={() => setFullScreen(!fullScreen)}
          className="p-2 font-semibold bg-black hover:bg-slate-700 text-white hover:text-slate-200 rounded"
        >
          {fullScreen ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
        </button>
      </div>
      <div className="px-4 gap-2">
        <StudySectionTopic
          topic="PHP"
          description="To learn the basic concepts of php"
        >
          <StudySubTopic subtopic="Classes" />
          <StudySubTopic subtopic="Functions" />
          <StudySubTopic subtopic="Attributes" />
        </StudySectionTopic>
        <StudySectionTopic topic="React" description="To learn how HOC works">
          <StudySubTopic subtopic="Logic" />
          <StudySubTopic subtopic="When to Use" />
          <StudySubTopic subtopic="Not to Do's" />
        </StudySectionTopic>
      </div>
    </div>
  );
};

export default StudySection;
