"use client";
//store imports
import { useStore } from "../store/zustand";
import useJokeStore from "../store/useJokeStore";

export default function Explanation() {
  const joke = useJokeStore(useStore, (state) => state.joke);
  const isPending = useJokeStore(useStore, (state) => state.isPending);
  const hasError = useJokeStore(useStore, (state) => state.error);

  return (
    <>
      <div
        className="text-white mt-4 w-[calc(100%-10em)] break-words
       break-all flex flex-col items-center bg-gradient-to-tr from-purple-500
        to-gray-950 justify-center rounded-2xl font-nunito h-max  p-8 pt-8
         drop-shadow-lg shadow-lg shadow-slate-500 overflow-y-auto  text-justify"
      >
        {hasError && (
          <p className="font-mono ">
            <span className="text-white">An error occured</span>
          </p>
        )}
        {isPending && (
          <p className="font-mono h-max overflow-y-scroll no-scrollbar">
            <span className="text-black">loading...explaining... </span>
          </p>
        )}
        {joke && !isPending && (
          <p className="font-mono h-max overflow-y-scroll no-scrollbar">
            <span className="text-black">Explanation:</span> {joke1}
          </p>
        )}
      </div>
    </>
  );
}
