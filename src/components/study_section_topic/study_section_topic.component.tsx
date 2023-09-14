import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaChevronDown, FaChevronUp, FaTrashAlt } from "react-icons/fa";
import type { AppDispatch, RootState } from "@/redux/store";
import { selectTopic, deleteTopic } from "@/redux/topics/topics";
import { handleHideSubTopicsContainer } from "@/redux/utils/utils";
import { Topic } from "@/utils/interfaces";
import StudySubTopic from "../study_sub_topic/study_sub_topic.component";
import { selectSubTopics } from "@/redux/sub_topics/sub_topics";

type StudySectionTopicProps = {
  topic: Topic;
};

const StudySectionTopic = ({ topic }: StudySectionTopicProps) => {
  const [hidden, setHidden] = useState<boolean>(true);
  const [deleteMsg, setDeleteMsg] = useState<boolean>(false);

  const status = useSelector((state: RootState) => state.subTopics.status);
  const subtopics = useSelector(
    (state: RootState) => state.subTopics.subtopics
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSelectTopic = (id: number) => {
    dispatch(selectTopic(id));
    dispatch(handleHideSubTopicsContainer());
  };

  useEffect(() => {
    console.log("study section topic", topic.id!);
    dispatch(selectSubTopics(topic.id!));
  }, [topic, status]);

  const handleDelete = (id: number) => {
    dispatch(deleteTopic(id));
    setDeleteMsg(!deleteMsg);
  };

  return (
    <div className="w-full mt-2 text-[#edf0ef] bg-[#371e30]/60 flex justify-between rounded overflow-hidden">
      <div className="flex gap-8">
        <button
          onClick={() => handleSelectTopic(topic.id!)}
          className="px-2 bg-[#f6603b] hover:bg-[#371e30] transform duration-500 ease-in-out"
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

      <div className={`${hidden ? "hidden" : ""} border-t border-[#f6603b]`}>
        <p className="px-2">{topic.description}</p>
        <div className="px-2">
          {subtopics.length
            ? subtopics
                .filter((item) => item.topicId === topic.id)
                .map((sub: any) => (
                  <StudySubTopic key={sub.id} subtopic={sub.title} />
                ))
            : ""}
        </div>
      </div>
      <div className="flex gap-2">
        <div
          style={{}}
          className={`${
            deleteMsg ? "h-fit" : "h-0"
          } flex items-center gap-2 text-slate-300 text-xs  overflow-hidden`}
        >
          <h1>Are you sure you want to delete this topic?</h1>
          <button
            onClick={() => handleDelete(topic.id!)}
            className="text-[#edf0ef] hover:text-[#f6603b] text-base transform duration-500 ease-in-out"
          >
            Yes
          </button>
          /
          <button
            onClick={() => setDeleteMsg(!deleteMsg)}
            className="text-[#edf0ef] hover:text-[#f6603b] text-base transform duration-500 ease-in-out"
          >
            No
          </button>
        </div>
        <button
          onClick={() => setDeleteMsg(!deleteMsg)}
          className="px-2 bg-[#f6603b] hover:bg-[#371e30] transform duration-500 ease-in-out"
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default StudySectionTopic;
