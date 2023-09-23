import Image from "next/image";
import Link from "next/link";

const api =
  "http://127.0.0.1:1337/api/posts?filters[categories][name][$eq]=history&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=4&populate=*";
const getHistoryArticles = async () => {
  const response = await fetch(api, {
    method: "GET",
    headers: {
      Authorization: `bearer ${process.env.STRAPI_SALT}`,
    },
  });
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error(response.status);
  }
  //console.log(response.headers);
  return await response.json();
};

export default async function History() {
  const { data } = await getHistoryArticles();

  if (data.length === 0) {
    return (
      <h3 className="text-lg md:text-2xl my-20 text-zinc-500">
        Δεν υπάρχουν άρθρα με θέμα την ιστορία ακόμη
      </h3>
    );
  }

  const renderRecentlyHistoryPosts = () => {
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
          className="md:w-6/12"
          key={post.id}
          href={`/post/${post.attributes.slug}`}
        >
          <div className="pt-4 sm:px-6 mb-11">
            <Image
              width={1000}
              height={660}
              sizes="100vw"
              src={`http://127.0.0.1:1337${img}`}
              alt={
                alternativeText !== null ? alternativeText : "Main_Thumbnail"
              }
            />
            <h3 className="pt-3 hover:text-orange-700 sm:text-xl ">
              {post.attributes.title}
            </h3>
            <time className="pt-2 text-gray">Published at: {date}</time>
          </div>
        </Link>
      );
    });
  };

  return <>{renderRecentlyHistoryPosts()}</>;
}
