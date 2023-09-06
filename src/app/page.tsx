"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

import StudySection from "../components/study_section/study_section.component";
import SubTopicsContainer from "@/components/sub_topics_container/sub_topics_container.component";
import TopicForm from "@/components/topic_form/topic_form.component";
import { Status } from "@/utils/interfaces";

export default function Home() {
  const hideContainer = useSelector(
    (state: RootState) => state.utils.hide_sub_topics_container
  );
  const hideTopicForm = useSelector(
    (state: RootState) => state.utils.hide_topic_form
  );
  return (
    <>
      {hideContainer ? "" : <SubTopicsContainer />}
      {hideTopicForm ? "" : <TopicForm />}

      <main className="p-2  flex min-h-screen flex-col items-center  overflow-hidden">
        <h1 className="mb-4 pb-4 text-5xl font-bold border-b-4 border-black">
          Learning Tracker
        </h1>

        {/* Learning, Next to Learn, Finished */}
        <div className="flex flex-col gap-2 z-0">
          {/* Learning */}
          <StudySection name={Status.LEARNING} bgColor="#6ce36c75" />
          {/* Next to Learn */}
          <StudySection name={Status.WANT_TO_LEARN} bgColor="#5c5cdc75" />
          {/* Finished */}
          <StudySection name={Status.FINISHED} bgColor="#cb5c5c75" />
        </div>
      </main>
    </>
  );
}
