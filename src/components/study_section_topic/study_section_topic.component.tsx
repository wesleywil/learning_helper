import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AppDispatch } from "@/redux/store";
import { handleHideSubTopicsContainer } from "@/redux/utils/utils";

type StudySectionTopicProps = {
  topic: string;
  description: string;
  children: React.ReactNode;
};

const StudySectionTopic = ({
  topic,
  description,
  children,
}: StudySectionTopicProps) => {
  const [hidden, setHidden] = useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="w-full mt-2 text-white bg-black/60 rounded overflow-hidden">
      <div className="flex gap-8">
        <button
          onClick={() => dispatch(handleHideSubTopicsContainer())}
          className="px-2 hover:text-slate-800 bg-slate-800 hover:bg-slate-100 transform duration-500 ease-in-out"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => setHidden(!hidden)}
          className="flex items-center gap-1 text-left text-xl font-bold"
        >
          {hidden ? <FaChevronDown /> : <FaChevronUp />}

          {topic}
        </button>
      </div>

      <div className={`${hidden ? "hidden" : ""} border-t border-white`}>
        <p className="px-2">{description}</p>
        <div className="px-2">{children}</div>
      </div>
    </div>
  );
};

export default StudySectionTopic;
