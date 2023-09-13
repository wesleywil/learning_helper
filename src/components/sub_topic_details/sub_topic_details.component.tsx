"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { FaTrashAlt } from "react-icons/fa";
import { SubTopic } from "@/utils/interfaces";
import { deleteSubTopic, updateSubTopic } from "@/redux/sub_topics/sub_topics";

type SubTopicDetailsProps = {
  subTopic: SubTopic;
};

const SubTopicDetails = ({ subTopic }: SubTopicDetailsProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(subTopic.description);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteSubTopic(subTopic.id!));
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescription(value);
  };

  const handleUpdate = () => {
    const data = {
      description,
      finished: false,
      id: subTopic.id!,
    };
    dispatch(updateSubTopic(data));
    setEdit(!edit);
  };
  return (
    <div className="text-[#edf0ef]">
      <div className="px-2 flex justify-between">
        <h3 className="text-2xl font-semibold">{subTopic.title}</h3>
        <button
          onClick={handleDelete}
          className="hover:text-[#f6603b] transform duration-700 ease-in-out"
        >
          <FaTrashAlt />
        </button>{" "}
      </div>
      {edit ? (
        <div className="w-full h-28 flex gap-2 flex-col">
          <textarea
            onDoubleClick={handleUpdate}
            onChange={handleChange}
            className="w-full h-full p-2 bg-slate-100 text-black rounded"
          >
            {description}
          </textarea>
        </div>
      ) : (
        <p className="w-full h-28 p-2 bg-[#edf0ef] text-black rounded">
          {description}
        </p>
      )}

      <button
        onClick={() => setEdit(!edit)}
        className="px-2 hover:text-[#f6603b] transform duration-500 ease-in-out"
      >
        {edit ? "double click the textarea to save" : "click to edit"}
      </button>
    </div>
  );
};

export default SubTopicDetails;
