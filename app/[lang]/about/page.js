import Image from "next/image";
import Nikos from "../../../public/img/Papapetrou_Nikos.jpg";
import Philip_Sheild from "../../../public/img/shield.jpg";
import Cheimaditida from "../../../public/img/cheimaditida.jpg";
import { getDictionary } from "@/lib/dictionary";

export const metadata = {
  title: {
    absolute: "About",
  },
};

export default async function About({ params }) {
  //console.log(params);
  const { page } = await getDictionary(params.lang);
  //  console.log(page);
  return (
    <main className="pt-28">
      <div className="flex flex-col items-center px-5">
        <Image
          className="rounded-lg mb-3 sm:w-80 h-auto"
          sizes="(min-width: 720px) 650px, calc(95.5vw - 19px)"
          src={Nikos}
          alt="Photo of blog owner"
        />
        <h2 className="pb-5 font-literata sm:text-2xl text-orange-700">
          {page.about.h2}
        </h2>
        <div className="flex flex-col sm:flex-row justify-around items-center mb-6 sm:w-9/12">
          <p className="text-sm md:text-base leading-relaxed sm:leading-7 break-normal mb-5 max-w-lg pr-6">
            {page.about.p1}
          </p>
          <Image
            width={500}
            height={500}
            sizes="(min-width: 640px) 320px, calc(100vw - 40px)"
            className="w-64 mb-5 sm:w-80"
            src={Philip_Sheild}
            alt="Philip's shield"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:w-9/12 mb-10">
          <p className="text-sm sm:order-last md:text-base leading-relaxed sm:leading-7 break-normal mb-5 max-w-lg ml-5">
            {page.about.p2}
          </p>
          <Image
            className="w-full h-auto"
            sizes="(min-width: 1000px) calc(75vw - 432px), (min-width: 640px) calc(4.41vw + 260px), calc(100vw - 40px)"
            src={Cheimaditida}
            alt="Λίμνη Χειμαδίτιδα"
          />
        </div>
      </div>
    </main>
  );
}
