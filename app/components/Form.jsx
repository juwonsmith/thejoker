"use client";
//store imports
import { useStore } from "../store/zustand";
import usejokeStore from "../store/usejokestore";

//natives
import OpenAI from "openai";
import { useState } from "react";

export default function Form() {
  const [joke, setjoke] = useState("");
  const addJoke = useStore((state) => state.addJoke);
  const addOrigin = useStore((state) => state.addOrigin);
  const originJoke = usejokeStore(useStore, (state) => state.originJoke);
  const setIspending = useStore((state) => state.setIspending);
  const setError = useStore((state) => state.setError);

  const handleSubmit = async (e) => {
    e.preventDefault();
    addOrigin(joke);
    setIspending(true);
    setError(false);
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const chatCompletion = await openai.chat.completions
      .create({
        messages: [{ role: "user", content: `explain this joke: ${joke}` }],
        model: "gpt-3.5-turbo",
      })
      .catch(() => {
        setIspending(false);
        setError(true);
      });

    const dataexplained = chatCompletion;

    addJoke(dataexplained.choices[0].message.content);
    setIspending(false);
    setError(false);
  };

  const handleClear = () => {
    setjoke("");
  };
  const handleTest = () => {
    setjoke("What do you call a fake noodle? An impasta.");
  };

  return (
    <form
      className="w-full flex-col flex justify-center items-center"
      onSubmit={handleSubmit}
    >
      <textarea
        name="description"
        placeholder={
          originJoke ? `Last joke: ${originJoke}` : "Write your joke here."
        }
        className="w-[calc(100%-10em)] h-32 resize-none outline-black font-nunito p-2"
        required
        onChange={(e) => setjoke(e.target.value)}
        value={joke}
        maxLength={1000}
      ></textarea>
      <div className="flex gap-4 mt-2">
        <button className="text-white p-4 font-mono hover:animate-pulse bg-gradient-to-r  from-purple-500 to-gray-300 rounded-md hover:text-black transition-colors duration-300">
          Explain
        </button>
        <button
          className="text-white bg-gradient-to-l hover:animate-pulse  from-purple-500 to-gray-300 p-4 font-mono rounded-md  hover:text-black"
          onClick={() => handleClear()}
        >
          clear
        </button>
        <button
          className="text-white bg-gradient-to-l hover:animate-pulse  from-purple-500 to-gray-300 p-4 font-mono rounded-md  hover:text-black"
          onClick={() => handleTest()}
        >
          Test run
        </button>
      </div>
    </form>
  );
}
