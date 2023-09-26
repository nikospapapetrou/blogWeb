import Image from "next/image";
import Articles from "./components/Articles";
import dokimi from "../public/img/example.jpg";
import History from "./components/History";
import garry from "../public/img/garry.svg";
import nikos from "../public/img/Papapetrou_Nikos.jpg";
import limni from "../public/img/cheimaditida.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex flex-col justify-center items-center pt-16 sm:pt-24 px-4">
        <h2 className="pt-8 font-literata text-xl sm:text-3xl md:text-4xl font-medium text-mdblue tracking-wide mb-2 sm:mb-4">
          Ιστορία
        </h2>
        <div className="grid md:grid-cols-2 gap-9 text-black justify-center mx-auto w-full md:max-w-5xl h-full">
          <History />
        </div>

        <h2 className="pt-10 sm:pb-10 font-literata text-2xl sm:text-3xl md:text-4xl font-medium text-mdblue tracking-wide mb-2 sm:mb-4">
          Άρθρα
        </h2>
        <div className="grid md:grid-cols-2 gap-9 text-black justify-center mx-auto w-full md:max-w-5xl h-full">
          <Link href="#" className="hover:scale-95 transition-all duration-150">
            <div>
              <Image
                width={0}
                height={0}
                style={{ width: "100%", height: "auto" }}
                src={limni}
                alt="logo"
              />
              <h3 className="font-literata pt-3 text-slate-800 hover:text-orange-700 text-lg sm:text-xl breal-all hyphens-auto line-clamp-3">
                Ο τίτλος του χορευτήss ssssssss ssssssss ssss ssss ssss sss
                sssss sssssss ssss sssssss ssssssss ssssss ssss ssssss sss
              </h3>
              <time className="text-sm pt-2 text-gray">
                Published at: 7/9/2020{" "}
              </time>
            </div>
          </Link>
          <Link href="#">
            <div className="h-60">
              <Image
                width={0}
                height={0}
                style={{ width: "100%", height: "90%" }}
                src={dokimi}
                className="object-scale-down"
                alt="logo"
              />
              <h3 className="font-literata pt-3 text-slate-800 hover:text-orange-700 text-lg sm:text-xl breal-all hyphens-auto line-clamp-3">
                Ο τίτλος του χορευτή
              </h3>
              <time className="text-sm pt-2 text-gray">
                Published at: 7/9/2020{" "}
              </time>
            </div>
          </Link>
          <Link href="#" className="">
            <div className="">
              <Image
                width={0}
                height={0}
                style={{ width: "100%", height: "auto" }}
                src={nikos}
                className="object-scale-down"
                alt="logo"
              />
              <h3 className="font-literata pt-3 hover:text-orange-700 text-lg sm:text-xl ">
                Ο τίτλος του χορευτή
              </h3>
              <time className="text-sm pt-2 text-gray">
                Published at: 7/9/2020{" "}
              </time>
            </div>
          </Link>
          <Link href="#">
            <div>
              <Image
                width={0}
                height={0}
                style={{ width: "100%", height: "auto" }}
                src={limni}
                alt="logo"
              />
              <h3 className="font-literata pt-3 hover:text-orange-700 text-lg sm:text-xl ">
                Ο τίτλος του χορευτή
              </h3>
              <time className="text-sm pt-2 text-gray">
                Published at: 7/9/2020{" "}
              </time>
            </div>
          </Link>
        </div>
      </main>

      <section
        className="flex justify-center bg-[#F8ECC2] mt-8 py-10"
        aria-label="μία svg εικόνα με έναν φωτογράφο"
      >
        <Image src={garry} alt="garry" />
      </section>
    </>
  );
}
