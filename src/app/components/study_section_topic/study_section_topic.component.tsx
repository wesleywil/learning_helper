import { useState } from "react";

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
  return (
    <div className="w-full px-2 mt-2 text-white bg-black/60 rounded overflow-hidden">
      <button
        onClick={() => setHidden(!hidden)}
        className="text-left text-xl font-bold"
      >
        {topic}
      </button>
      <div className={`${hidden ? "hidden" : ""} border-t border-white`}>
        <p>{description}</p>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default StudySectionTopic;
