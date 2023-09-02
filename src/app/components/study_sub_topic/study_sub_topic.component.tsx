type StudySubTopicProps = {
  subtopic: string;
};

const StudySubTopic = ({ subtopic }: StudySubTopicProps) => {
  return (
    <div className="flex gap-2">
      <input type="checkbox" />
      <h2>{subtopic}</h2>
    </div>
  );
};

export default StudySubTopic;
