import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
export async function generateMetadata({ params }) {
  const { page } = await getDictionary(params.lang);
  return {
    title: page.history.title,
    description: page.history.description,
    alternates: {
      canonical: `${params.lang}/history`,
    },
  };
}

const getHistoryArticles = async (locale) => {
  const api = `https://strapi.nikospap.blog/api/posts?filters[category][name][$eq]=history&sort=publishedAt:desc&populate=*&locale=${locale}`;

  const response = await fetch(api, {
    method: "GET",
    headers: {
      Authorization: `bearer ${process.env.STRAPI_SALT}`,
    },
  });
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  //console.log(response.headers);
  return await response.json();
};

export default async function Istoria({ params }) {
  const { page } = await getDictionary(params.lang);
  const { data } = await getHistoryArticles(params.lang);
  if (data.length === 0) {
    return (
      <main className="flex flex-col justify-center items-center pt-24">
        <h2 className="pt-4 font-literata text-2xl sm:text-4xl font-medium text-mdblue tracking-wide mb-5">
          {page.history.title}
        </h2>

        <h3 className="font-literata text-lg md:text-2xl my-20 text-zinc-500">
          {page.history.noArticles}
        </h3>
      </main>
    );
  }

  const renderHistoryArticles = () => {
    return data.map((post) => {
      const alternativeText =
        post.attributes.main_image.data.attributes.alternativeText;
      const img = post.attributes.main_image.data.attributes.url;
      const rawDate = new Date(post.attributes.publishedAt);
      const date = rawDate.toLocaleDateString(undefined, {
        dateStyle: "medium",
      });
      return (
        <Link
          className="hover:scale-95 transition-all duration-150"
          key={post.id}
          href={`/post/${post.attributes.slug}`}
        >
          <header>
            <Image
              className="object-scale-down"
              width={1000}
              height={660}
              sizes="100vw"
              src={`https://strapi.nikospap.blog${img}`}
              alt={
                alternativeText !== null ? alternativeText : "Main_Thumbnail"
              }
            />
            <h3 className="font-literata pt-3 text-slate-800sm:font-bold tracking-wide hover:text-orange-700 text-lg sm:text-xl md:text-2xl breal-all hyphens-auto line-clamp-3">
              {post.attributes.title}
            </h3>
            <time className="pt-2 text-gray text-sm sm:text-base">
              Published at: {date}
            </time>
          </header>
        </Link>
      );
    });
  };

  return (
    <main className="flex flex-col justify-center items-center pt-24">
      <h2 className="pt-4 font-literata text-2xl sm:text-4xl font-medium text-mdblue tracking-wide mb-5">
        Ιστορία
      </h2>

      <div className="grid md:grid-cols-2 gap-9 justify-center mx-auto w-full md:max-w-5xl h-full">
        {renderHistoryArticles()}
      </div>
    </main>
  );
}
