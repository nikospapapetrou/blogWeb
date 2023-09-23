import { getAllPosts } from "@/lib/getAllPosts";

export default async function sitemap() {
  const baseUrl = "https://nikospap.blog";
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
