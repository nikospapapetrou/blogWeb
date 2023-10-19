const getAllPosts = async (locale) => {
  console.log(`first ${locale}`);
  const api = `https://strapi.nikospap.blog/api/posts?sort=publishedAt:desc&locale=${locale}&populate=*`;
  // const api = `https://strapi.nikospap.blog/${locale}/api/posts`;
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

export { getAllPosts };
