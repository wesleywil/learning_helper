"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { fetchTopics } from "@/redux/topics/topics";
import { fetchSubTopics } from "@/redux/sub_topics/sub_topics";
import { Status } from "@/utils/interfaces";

import StudySection from "../components/study_section/study_section.component";
import SubTopicsContainer from "@/components/sub_topics_container/sub_topics_container.component";
import TopicForm from "@/components/topic_form/topic_form.component";
import { SubTopicsCodStatus, TopicCodStatus } from "@/utils/status";

export default function Home() {
  const hideContainer = useSelector(
    (state: RootState) => state.utils.hide_sub_topics_container
  );
  const hideTopicForm = useSelector(
    (state: RootState) => state.utils.hide_topic_form
  );
  const status = useSelector((state: RootState) => state.topics.status);
  const subtopicstatus = useSelector(
    (state: RootState) => state.subTopics.status
  );
  const subtopics = useSelector(
    (state: RootState) => state.subTopics.selectedsubtopics
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log("page effect");
    if (
      status === TopicCodStatus.IDLE ||
      status === TopicCodStatus.CREATED ||
      status === TopicCodStatus.DELETED
    ) {
      console.log("subtopics fetch");
      dispatch(fetchTopics());
    }
    if (
      subtopicstatus === SubTopicsCodStatus.IDLE ||
      subtopicstatus === SubTopicsCodStatus.CREATED ||
      subtopicstatus === SubTopicsCodStatus.UPDATED ||
      subtopicstatus === SubTopicsCodStatus.DELETED
    ) {
      console.log("subtopics fetch");
      dispatch(fetchSubTopics());
    }
  }, [status, subtopicstatus, subtopics]);

  return (
    <>
      {hideContainer ? "" : <SubTopicsContainer />}
      {hideTopicForm ? "" : <TopicForm />}

      <main className="p-2  flex min-h-screen flex-col items-center bg-[#371e30] overflow-hidden">
        <h1 className="my-4 pb-4 text-[#edf0ef] text-5xl font-bold uppercase">
          Learning Tracker
        </h1>

        {/* Learning, Next to Learn, Finished */}
        <div className="flex flex-col gap-2 z-0">
          {/* Learning */}
          <StudySection name={Status.LEARNING} bgColor="#edf0ef75" />
          {/* Next to Learn */}
          <StudySection name={Status.WANT_TO_LEARN} bgColor="#edf0ef75" />
          {/* Finished */}
          <StudySection name={Status.FINISHED} bgColor="#edf0ef75" />
        </div>
      </main>
    </>
  );
}
