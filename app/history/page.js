import React from "react";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }) {
  return {
    title: "History",
    description: "History Articles",
    alternates: {
      canonical: `/history`,
    },
  };
}

const api =
  "http://localhost:1337/api/posts?filters[categories][name][$eq]=history&sort=publishedAt:desc&populate=*";
const getHistoryArticles = async () => {
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

export default async function Istoria() {
  const { data } = await getHistoryArticles();
  if (data.length === 0) {
    return (
      <main className="flex flex-col justify-center items-center pt-24">
        <h2 className="pt-4 font-literata text-2xl sm:text-4xl font-medium text-mdblue tracking-wide mb-5">
          Ιστορία
        </h2>

        <h3 className="text-lg md:text-2xl my-20 text-zinc-500">
          No history Articles yet!
        </h3>
      </main>
    );
  }

  const renderHistoryArticles = () => {
    return data.map((post) => {
      const alternativeText =
        post.attributes.main_image.data.attributes.alternativeText;
      const img = post.attributes.main_image.data.attributes.formats.medium.url;
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
          <div>
            <Image
              className="object-scale-down"
              width={1000}
              height={660}
              sizes="100vw"
              src={`http://localhost:1337${img}`}
              alt={
                alternativeText !== null ? alternativeText : "Main_Thumbnail"
              }
            />
            <h3 className="font-literata pt-3 hover:text-orange-700 sm:text-xl">
              {post.attributes.title}
            </h3>
            <time className="pt-2 text-gray text-sm sm:text-base">
              Published at: {date}
            </time>
          </div>
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
