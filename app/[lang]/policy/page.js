import { getDictionary } from "@/lib/dictionary";
export default async function Privacy({ params }) {
  const { page } = await getDictionary(params.lang);
  return (
    <main className="mt-20 flex justify-center">
      <section className="flex flex-col gap-5 max-w-3xl	p-6 text-neutral-700">
        <h3 className="text-lg md:text-xl lg:text-4xl font-semibold tracking-wide	">
          {page.privacyPolicy.titles.t1}
        </h3>
        <h4 className="text-base md:text-lg lg:text-xl font-semibold tracking-wide">
          {page.privacyPolicy.titles.t2}
        </h4>
        <p className="text-xs sm:text-sm md:text-base">
          {page.privacyPolicy.paragraphs.general}
        </p>
        <h4 className="text-base md:text-lg lg:text-xl font-semibold tracking-wide">
          {page.privacyPolicy.titles.t3}
        </h4>
        <p className="text-xs sm:text-sm md:text-base">
          {page.privacyPolicy.paragraphs.p1}
        </p>
        <h4 className="text-base md:text-lg lg:text-xl font-semibold tracking-wide">
          {page.privacyPolicy.titles.t4}
        </h4>
        <p className="text-xs sm:text-sm md:text-base">
          {page.privacyPolicy.paragraphs.p2}
        </p>
        <h4 className="text-base md:text-lg lg:text-xl font-semibold tracking-wide">
          {page.privacyPolicy.titles.t5}
        </h4>
        <p className="text-xs sm:text-sm md:text-base">
          {page.privacyPolicy.paragraphs.p3}
        </p>
        <h4 className="text-base md:text-lg lg:text-xl font-semibold tracking-wide">
          {page.privacyPolicy.titles.t6}
        </h4>
        <p className="text-xs sm:text-sm md:text-base">
          {page.privacyPolicy.paragraphs.p4}
        </p>
        <h4 className="text-base md:text-lg lg:text-xl font-semibold tracking-wide">
          {page.privacyPolicy.titles.t7}
        </h4>
        <p className="text-xs sm:text-sm md:text-base">
          {page.privacyPolicy.paragraphs.p5}
        </p>
      </section>
    </main>
  );
}
