type StudySubTopicProps = {
  subtopic: string;
};

const StudySubTopic = ({ subtopic }: StudySubTopicProps) => {
  return (
    <div className="flex gap-2">
      <div className="self-center h-2 w-2 bg-[#edf0ef] rounded-full"></div>
      <h2>{subtopic}</h2>
    </div>
  );
};

export default StudySubTopic;
