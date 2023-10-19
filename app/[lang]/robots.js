export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemaps: [
      "https://nikospap.blog/el/sitemap.xml",
      "https://nikospap.blog/en/sitemap.xml",
    ],
  };
}
