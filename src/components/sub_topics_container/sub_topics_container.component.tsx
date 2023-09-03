import { FaTimes, FaPlus } from "react-icons/fa";

import SubTopicDetails from "../sub_topic_details/sub_topic_details.component";

const SubTopicsContainer = () => {
  return (
    <div className="absolute min-h-screen min-w-full flex flex-col items-center justify-center bg-black/70 z-10">
      <button className="p-2 font-semibold text-5xl text-white hover:bg-red-600 border-2 border-white hover:border-red-600 rounded-full transform duration-700 ease-in-out">
        <FaTimes />
      </button>
      <div className="mt-8 flex gap-2">
        <button className="p-2 font-semibold text-xl bg-red-400 hover:bg-red-600 text-white rounded-full transform duration-500 ease-in-out">
          <FaPlus />
        </button>
        <h2 className="text-3xl font-bold text-white">PHP</h2>
      </div>

      <div className="px-2 md:w-4/5 xl:w-1/3 h-[35rem] flex flex-col gap-2 overflow-y-auto">
        <SubTopicDetails />
      </div>
    </div>
  );
};

export default SubTopicsContainer;
