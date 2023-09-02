import { FaPlus } from "react-icons/fa";

import StudySection from "./components/study_section/study_section.component";

export default function Home() {
  return (
    <main className="p-2  flex min-h-screen flex-col items-center  overflow-hidden">
      <h1 className="mb-4 pb-4 text-5xl font-bold border-b-4 border-black">
        Learning Tracker
      </h1>

      {/* Learning, Next to Learn, Finished */}
      <div className="flex flex-col gap-2">
        {/* Learning */}
        <StudySection name="Learning" bgColor="green-400" />
        {/* Next to Learn */}
        <StudySection name="Next To Learn" bgColor="blue-400" />
        {/* Finished */}
        <StudySection name="Finished" bgColor="red-400" />
      </div>
    </main>
  );
}
