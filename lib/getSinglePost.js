export const getSinglePost = async (slug, locale) => {
  const response = await fetch(
    `https://strapi.nikospap.blog/api/posts?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        Authorization: `bearer ${process.env.STRAPI_SALT}`,
      },
    }
  );
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  //console.log(response.headers);
  return await response.json();
};
