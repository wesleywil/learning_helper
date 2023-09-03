"use client";

import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const SubTopicDetails = () => {
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <div className="text-white">
      <div className="px-2 flex justify-between">
        <h3 className="text-2xl font-semibold">Classes</h3>
        <button className="hover:text-red-400 transform duration-700 ease-in-out">
          <FaTrashAlt />
        </button>{" "}
      </div>
      {edit ? (
        <div className="w-full h-28">
          <textarea
            onDoubleClick={() => setEdit(!edit)}
            className="w-full h-full p-2 bg-slate-100 text-black rounded"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
            cumque consequatur, iusto ab amet laboriosam, necessitatibus magnam
            ipsam eum alias, sequi sint ullam quo quae deleniti praesentium
            voluptate officia temporibus?
          </textarea>
        </div>
      ) : (
        <p className="w-full h-28 p-2 bg-white text-black rounded">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
          cumque consequatur, iusto ab amet laboriosam, necessitatibus magnam
          ipsam eum alias, sequi sint ullam quo quae deleniti praesentium
          voluptate officia temporibus?
        </p>
      )}

      <button
        onClick={() => setEdit(!edit)}
        className="px-2 hover:text-green-400 transform duration-500 ease-in-out"
      >
        {edit ? "double click the textarea to save" : "click to edit"}
      </button>
    </div>
  );
};

export default SubTopicDetails;
