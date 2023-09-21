"use client"; // Error components must be Client Components

export default function Error({ error, reset }) {
  return (
    <div className="flex items-center justify-center flex-col font-nunito w-full h-screen bg-center bg-joker bg-no-repeat bg-cover md:bg-top ">
      <h2 className="text-red-500">Something went wrong!</h2>
      <span className="text-red-500">{error.message}</span>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="text-white bg-gradient-to-l animate-pulse mt-4  from-purple-500 to-gray-300 p-4 font-mono rounded-md  hover:text-black"
      >
        Try again
      </button>
    </div>
  );
}
