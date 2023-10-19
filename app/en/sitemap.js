//import { getAllPosts } from "@/lib/getAllPosts";
const getAllPosts = async () => {
  const api = `https://strapi.nikospap.blog/api/posts?sort=publishedAt:desc&populate=*&locale=en`;
  const response = await fetch(api, {
    cache: "no-store",
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

export default async function sitemap() {
  const baseUrl = "https://nikospap.blog/en";
  const { data } = await getAllPosts();
  const postUrls = data.map((post) => ({
    url: `${baseUrl}/post/${post.attributes.slug}`,
    lastModified: post.attributes.updateAt,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/history`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
    },
    ...postUrls,
  ];
}
