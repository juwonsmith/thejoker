"use client";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "../Loading";
import { useFetchJokesEvery8Seconds } from "../hooks/FetchJokes";
import JokeView from "../components/JokeView";

export default function page() {
  const [joke, error] = useFetchJokesEvery8Seconds();
  return (
    <div className=" bg-center bg-joker bg-no-repeat bg-cover md:bg-top md:h-[60em] h-screen w-full flex flex-col items-center">
      <Link href="/" className="self-start">
        <div className="bg-gradient-to-tr from-slate-500 hover:animate-pulse to-purple-300  hover:bg-gradient-to-tr hover:from-slate-100 hover:to-slate-700 h-10 w-40 rounded-md text-center font-mono cursor-pointer  flex  items-center justify-center ">
          <span>Go back</span>
        </div>
      </Link>
      <div className="w-[calc(100%-10em)] rounded-3xl flex p-6 flex-col items-center justify-center bg-gradient-to-tr  from-purple-500 to-gray-950 h-max drop-shadow-lg shadow-md shadow-slate-300  mt-12">
        <Suspense fallback={<Loading />}>
          <JokeView joke={joke} error={error} />
        </Suspense>
      </div>
    </div>
  );
}
