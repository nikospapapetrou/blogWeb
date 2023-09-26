import Image from "next/image";
import Link from "next/link";

const api =
  "http://localhost:1337/api/posts?filters[categories][name][$eq]=articles&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=4&populate=*";

const getArticles = async () => {
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

export default async function Articles() {
  const { data } = await getArticles();
  console.log(data);
  if (data.length === 0) {
    return (
      <h3 className="font-literata text-lg md:text-2xl my-20 text-zinc-500">
        Δεν υπάρχουν Άρθρα ακόμη
      </h3>
    );
  }

  return data.map((post) => {
    const img = post.attributes.main_image.data.attributes.formats.small.url;
    const rawDate = new Date(post.attributes.publishedAt);
    const date = rawDate.toLocaleDateString(undefined, {
      dateStyle: "medium",
    });

    return (
      <Link
        href={`/post/${post.attributes.slug}`}
        className="hover:scale-95 transition-all duration-150"
        key={post.id}
      >
        <div>
          <Image
            className="object-scale-down"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            src={`http://localhost:1337${img}`}
            alt="logo"
          />
          <h3 className="font-literata pt-3 text-slate-800 hover:text-orange-700 text-lg sm:text-xl breal-all hyphens-auto line-clamp-3">
            {post.attributes.title}
          </h3>
          <time className="pt-2 text-gray">Published at: {date}</time>
        </div>
      </Link>
    );
  });
}
