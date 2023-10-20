//components
import Form from "./components/Form";
import Explanation from "./components/Explanation";
//native
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-screen bg-center bg-joker bg-no-repeat bg-cover md:bg-top md:h-[60em] pb-8 flex flex-col items-center gap-4 ">
      <Link href="/jokes" className="self-start" prefetch={false}>
        <div
          className="h-10 w-40 bg-gradient-to-tr from-slate-500 to-purple-300  hover:animate-pulse 
        hover:bg-gradient-to-tr hover:from-slate-100 hover:to-slate-700 flex items-center
         justify-center rounded-md font-mono cursor-pointer"
        >
          <span className="">jokes</span>
        </div>
      </Link>
      <Form />
      <Explanation />
    </main>
  );
}
