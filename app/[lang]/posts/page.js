import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";

export async function generateMetadata({ params }) {
  const { page } = await getDictionary(params.lang);
  return {
    title: page.articles.title,
    description: page.articles.description,
    alternates: {
      canonical: `${params.lang}/posts`,
    },
  };
}

const getAllPosts = async (locale) => {
  const api = `https://strapi.nikospap.blog/api/posts?filters[category][name][$eq]=articles&sort=publishedAt:desc&locale=${locale}&populate=*`;
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

export default async function Posts({ params }) {
  const { page } = await getDictionary(params.lang);
  const { data } = await getAllPosts(params.lang);
  if (data.length === 0) {
    return (
      <main className="flex flex-col justify-center items-center pt-24">
        <h2 className="pt-4 font-literata text-2xl sm:text-4xl font-medium text-mdblue tracking-wide mb-5">
          {page.articles.title}
        </h2>
        <h3 className="font-literata text-lg md:text-2xl my-20 text-zinc-500">
          Δεν υπάρχουν Άρθρα ακόμη
        </h3>
      </main>
    );
  }

  const renderArticles = () => {
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
          key={post.id}
          href={`/${params.lang}/post/${post.attributes.slug}`}
        >
          <header className="pt-4 px-4">
            <Image
              className="object-scale-down"
              width={600}
              height={400}
              sizes="100vw"
              src={`https://strapi.nikospap.blog${img}`}
              alt={
                alternativeText !== null ? alternativeText : "Main_Thumbnail"
              }
            />
            <h3 className="font-literata pt-3 text-slate-800sm:font-bold tracking-wide hover:text-orange-700 text-lg sm:text-xl md:text-2xl breal-all hyphens-auto line-clamp-3">
              {post.attributes.title}
            </h3>
            <time className="pt-2 text-gray text-sm">{date}</time>
          </header>
        </Link>
      );
    });
  };

  return (
    <main className="flex flex-col justify-center items-center pt-24">
      <h2 className="pt-2 font-literata text-2xl sm:text-4xl font-medium text-mdblue tracking-wide mb-5">
        {page.articles.title}
      </h2>

      <div className="grid md:grid-cols-2 gap-9 text-black justify-center mx-auto w-full md:max-w-5xl h-full mb-16">
        {renderArticles()}
      </div>
    </main>
  );
}
