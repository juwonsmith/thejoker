//images
import Image from "next/image";
import Hat from "./joker-hat.svg";
export default function Navbar() {
  return (
    <nav className="flex justify-center items-center w-full gap-2 mt-4 bg-white h-8 border-b-2 border-slate-800 drop-shadow-6xl">
      <h1 className="font-nunito text-4xl tracking-widest md:tracking-[1em] mb-2  ">
        The Joker
      </h1>
      <Image
        src={Hat}
        alt="joker hat"
        priority="100"
        width={30}
        height={30}
        className="mb-2 animate-bounce"
      />
    </nav>
  );
}
