export default function Home() {
  return (
    <main className="p-2  flex min-h-screen flex-col items-center  overflow-hidden">
      <h1 className="mb-4 pb-4 text-5xl font-bold border-b-4 border-black">
        Learning Tracker
      </h1>
      {/* Menu */}
      <div className="w-[95vh] mb-2 flex justify-start">
        <button className="px-2  bg-black hover:bg-gray-700 text-white text-xl font-bold rounded-full">
          +
        </button>
      </div>
      {/* Learning, Next to Learn, Finished */}
      <div className="flex flex-col gap-2">
        {/* Learning */}
        <div className="w-[95vh] h-64 p-4  bg-green-400/50 rounded"></div>
        {/* Next to Learn */}
        <div className="w-[95vh] h-64 p-4  bg-blue-400/50 rounded"></div>
        {/* Finished */}
        <div className="w-[95vh] h-64 p-4  bg-red-400/50 rounded"></div>
      </div>
    </main>
  );
}
