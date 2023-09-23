export const getSinglePost = async (slug) => {
  const response = await fetch(
    `http://127.0.0.1:1337/api/posts?filters[slug][$eq]=${slug}&populate=*`,
    {
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
