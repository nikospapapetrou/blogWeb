import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
export default async function Footer({ params }) {
  const { page } = await getDictionary(params);
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="bg-cyan-950 text-white h-auto mt-auto">
      <section className="h-64 flex flex-col justify-between max-w-4xl	mx-auto px-6">
        <div className="h-auto flex flex-col gap-5">
          <div>
            <h4 className="mt-6 text-base sm:text-lg md:text-xl md:tracking-wide">
              {page.footer.contact}
            </h4>
            <Link
              className="hover:text-orange-500 text-sm sm:text-base md:tracking-wide"
              href="mailto:contact@nikospap.blog"
            >
              contact@nikospap.blog
            </Link>
          </div>

          <Link
            className="pr-3 pt-5 hover:text-orange-500 text-sm md:text-base"
            href={`/${params}/policy`}
          >
            {page.footer.policy}
          </Link>
        </div>
        <p className="text-xs md:text-sm">
          <span>&#169; {year}</span> Papapetrou Nikos. All rights reserved.
        </p>
      </section>
    </footer>
  );
}

{
  /* <section className="max-w-4xl flex flex-col mx-auto text-xs sm:text-sm md:text-base p-5 sm:p-0 sm:pt-8 h-9">
<div className="sm:flex sm:flex-row justify-between">
  <div>
    <p className="text-base sm:text-lg mb-3">Επικοινωνία:</p>
    <span>
      <a
        className="hover:text-orange-500"
        href="mailto:contact@nikospap.blog"
      >
        {" "}
        contact@nikospap.blog
      </a>
    </span>
  </div>
</div>
<Link className="pr-3 pt-5 hover:text-orange-500" href="/policy">
  Πολιτική Απορρήτου
</Link>
</section>
<div className="max-w-4xl m-auto content-end flex mt-10  ">
<p className="text-xs md:text-sm mt-2 translate-y-16	md:translate-y-20">
  <span>&#169; {year}</span> Papapetrou Nikos. All rights reserved.
</p>
</div> */
}
