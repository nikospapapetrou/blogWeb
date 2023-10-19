import Image from "next/image";
import { getSinglePost } from "@/lib/getSinglePost";
import NotFound from "../../not-found";
import parse from "html-react-parser";

// Begin Of metadata
export async function generateMetadata({ params }) {
  const { data } = await getSinglePost(params.slug, params.lang);
  if (data.length === 0) {
    return (
      <>
        <NotFound />
      </>
    );
  }
  const arrKey = data[0].attributes.keywords.data;
  const keyworsdArr = arrKey.map((keyword) => {
    return keyword.attributes.keyword;
  });

  if (!data)
    return {
      title: "Not Found",
      description: "The page is not found",
    };

  return {
    title: data[0].attributes.title,
    description: data[0].attributes?.seo?.metaDescription,
    keywords: keyworsdArr,
    category: data[0].attributes.category.data.attributes.name,
    authors: [
      {
        name: `${data[0].attributes.admin_user.data.attributes.firstname} ${data[0].attributes.admin_user.data.attributes.lastname}`,
      },
    ],
    publishedTime: data[0].attributes.publishedAt,
    alternates: {
      canonical: `${params.lang}/post/${params.slug}`,
    },
  };
}
// End of metadata
export default async function Post({ params }) {
  const { data } = await getSinglePost(params.slug, params.lang);
  if (data.length === 0) {
    return (
      <>
        <NotFound />
      </>
    );
  }
  const title = data[0].attributes.title;
  const arrKey = data[0].attributes.keywords.data;
  const keyworsdArr = arrKey.map((keyword) => {
    return keyword.attributes.keyword;
  });
  const html = data[0].attributes.content;
  const content = parse(html);
  const altText = data[0].attributes.main_image.data.attributes.alternativeText;
  const caption = data[0].attributes.main_image.data.attributes?.caption;
  const author = `${data[0].attributes.admin_user.data.attributes.firstname} ${data[0].attributes.admin_user.data.attributes.lastname}`;

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    headline: data[0].attributes.title,
    description: data[0].attributes?.seo?.metaDescription,
    datePublished: data[0].attributes.publishedAt,
    dateModified: data[0].attributes.updatedAt,
    image: {
      "@type": "ImageObject",
      url: `https://strapi.nikospap.blog${data[0].attributes.main_image.data.attributes.url}`,
      caption: caption || "Επικεφαλίδα εικόνας",
    },
    author: {
      "@type": `{Person}`,
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Nikos Papapetrou",
    },
    keywords: keyworsdArr,
    articleBody: content,
  };
  return (
    <main className="mt-24 max-w-4xl mx-auto px-4 flex flex-col gap-3">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="grid grid-cols-1 gap-7">
        <header>
          <Image
            alt={altText}
            width={1780}
            height={840}
            src={`https://strapi.nikospap.blog${data[0].attributes.main_image.data.attributes.url}
          `}
          ></Image>
          <h1 className="font-literata text-2xl md:text-3xl text-cyan-900 font-semibold tracking-wide leading-7">
            {title}
          </h1>
        </header>

        <section className="grid grid-cols-1 gap-7 mb-20 text-sm md:text-base leading-7">
          {content}
        </section>
      </article>
    </main>
  );
}
