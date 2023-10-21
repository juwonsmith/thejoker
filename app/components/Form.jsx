"use client";
//store imports
import { useStore } from "../store/zustand";
import useJokeStore from "../store/usejokestore";
//natives
import OpenAI from "openai";
import { useState } from "react";

export default function Form() {
  const [joke, setJoke] = useState("");
  const addJoke = useStore((state) => state.addJoke);
  const addOrigin = useStore((state) => state.addOrigin);
  const lastJokeInput = useJokeStore(useStore, (state) => state.lastJokeInput);
  const setIsPending = useStore((state) => state.setIsPending);
  const setError = useStore((state) => state.setError);

  const getJokeExplanation = async () => {
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPEN_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Explain this joke: ${joke}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    return chatCompletion.choices[0].message.content;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addOrigin(joke);
    setIsPending(true);
    getJokeExplanation()
      .then((data) => {
        addJoke(data);
        setIsPending(false);
      })
      .catch(() => {
        setIsPending(false);
        setError(true);
      });
  };

  const handleClear = () => {
    setJoke("");
  };
  const handleTest = () => {
    setJoke("What do you call a fake noodle? An impasta.");
  };

  return (
    <form
      className="w-full flex-col flex justify-center items-center"
      onSubmit={handleSubmit}
    >
      <textarea
        name="description"
        placeholder={
          lastJokeInput
            ? `Last joke: ${lastJokeInput}`
            : "Write your joke here."
        }
        className="w-[calc(100%-10em)] h-32 resize-none outline-black font-nunito p-2"
        required
        onChange={(e) => setJoke(e.target.value)}
        value={joke}
        maxLength={1000}
      ></textarea>
      <div className="flex gap-4 mt-2">
        <button className="text-white p-4 font-mono hover:animate-pulse bg-gradient-to-r  from-purple-500 to-gray-300 rounded-md hover:text-black transition-colors duration-300">
          Explain
        </button>
        <button
          className="text-white bg-gradient-to-l hover:animate-pulse  from-purple-500 to-gray-300 p-4 font-mono rounded-md  hover:text-black"
          onClick={handleClear}
        >
          clear
        </button>
        <button
          className="text-white bg-gradient-to-l hover:animate-pulse  from-purple-500 to-gray-300 p-4 font-mono rounded-md  hover:text-black"
          onClick={handleTest}
        >
          Test run
        </button>
      </div>
    </form>
  );
}
