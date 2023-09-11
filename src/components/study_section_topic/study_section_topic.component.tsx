import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AppDispatch } from "@/redux/store";
import { selectTopic } from "@/redux/topics/topics";
import { handleHideSubTopicsContainer } from "@/redux/utils/utils";
import { Topic } from "@/utils/interfaces";
import StudySubTopic from "../study_sub_topic/study_sub_topic.component";

type StudySectionTopicProps = {
  topic: Topic;
};

const StudySectionTopic = ({ topic }: StudySectionTopicProps) => {
  const [hidden, setHidden] = useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();

  const handleSelectTopic = (id: number) => {
    dispatch(selectTopic(id));
    dispatch(handleHideSubTopicsContainer());
  };

  useEffect(() => {
    console.log("Study Section");
  }, [topic]);

  return (
    <div className="w-full mt-2 text-white bg-black/60 rounded overflow-hidden">
      <div className="flex gap-8">
        <button
          onClick={() => handleSelectTopic(topic.id!)}
          className="px-2 hover:text-slate-800 bg-slate-800 hover:bg-slate-100 transform duration-500 ease-in-out"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => setHidden(!hidden)}
          className="flex items-center gap-1 text-left text-xl font-bold"
        >
          <>
            {hidden ? <FaChevronDown /> : <FaChevronUp />}

            {topic.title}
          </>
        </button>
      </div>

      <div className={`${hidden ? "hidden" : ""} border-t border-white`}>
        <p className="px-2">{topic.description}</p>
        <div className="px-2">
          {topic.sub_topics?.length
            ? topic.sub_topics.map((sub) => (
                <StudySubTopic key={sub.id} subtopic={sub.title} />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default StudySectionTopic;
