import React from "react";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }) {
  return {
    title: "Άρθρα",
    description: "Άρθρα γενικού ενδιαφέροντος",
    alternates: {
      canonical: `/posts`,
    },
  };
}

const api =
  "http://127.0.0.1:1337/api/posts?filters[categories][name][$eq]=articles&sort=publishedAt:desc&populate=*";

const getAllPosts = async () => {
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

export default async function Posts() {
  const { data } = await getAllPosts();

  if (data.length === 0) {
    return (
      <main className="flex flex-col justify-center items-center pt-24">
        <h2 className="pt-4 font-literata text-2xl sm:text-4xl font-medium text-mdblue tracking-wide mb-5">
          Άρθρα
        </h2>
        <h3 className="text-lg md:text-2xl my-20 text-zinc-500">
          Δεν υπάρχουν Άρθρα ακόμη
        </h3>
      </main>
    );
  }

  const renderArticles = () => {
    return data.map((post) => {
      const alternativeText =
        post.attributes.main_image.data.attributes.alternativeText;
      const img = post.attributes.main_image.data.attributes.formats.small.url;
      const rawDate = new Date(post.attributes.publishedAt);
      const date = rawDate.toLocaleDateString(undefined, {
        dateStyle: "medium",
      });
      return (
        <Link key={post.id} href={`/post/${post.attributes.slug}`}>
          <div className="pt-4 px-4">
            <Image
              width={600}
              height={400}
              sizes="100vw"
              src={`http://127.0.0.1:1337${img}`}
              alt={
                alternativeText !== null ? alternativeText : "Main_Thumbnail"
              }
            />
            <h3 className="pt-3 sm:text-xl">{post.attributes.title}</h3>
            <time className="pt-2 text-gray text-sm">{date}</time>
          </div>
        </Link>
      );
    });
  };

  return (
    <main className="flex flex-col justify-center items-center pt-24">
      <h2 className="pt-2 font-literata text-2xl sm:text-4xl font-medium text-mdblue tracking-wide mb-5">
        Άρθρα
      </h2>

      <div className="flex flex-col pb-16 items-center text-black sm:grid sm:grid-cols-2 sm:content-end sm:justify-stretch md:max-w-5xl">
        {renderArticles()}
      </div>
    </main>
  );
}
