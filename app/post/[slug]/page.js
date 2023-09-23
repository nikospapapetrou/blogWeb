import Image from "next/image";
import { getSinglePost } from "@/lib/getSinglePost";
import NotFound from "../../not-found";
import parse from "html-react-parser";

export async function generateMetadata({ params }) {
  const { data } = await getSinglePost(params.slug);
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
    category: data[0].attributes.categories.data[0].attributes.name,
    authors: [
      {
        name: `${data[0].attributes.admin_user.data.attributes.firstname} ${data[0].attributes.admin_user.data.attributes.lastname}`,
      },
    ],
    publishedTime: data[0].attributes.publishedAt,
    alternates: {
      canonical: `/post/${params.slug}`,
    },
  };
}

export default async function Post({ params }) {
  const { data } = await getSinglePost(params.slug);

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
      url: "https://example.com/image.jpg",
      caption: "Επικεφαλίδα εικόνας",
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

      <Image
        alt={altText}
        width={500}
        height={500}
        src={`http://127.0.0.1:1337${data[0].attributes.main_image.data.attributes.url}
          `}
      ></Image>
      <h1 className="text-xl md:text-2xl text-cyan-900 font-semibold tracking-wide">
        {title}
      </h1>
      <section className="mb-20 text-xs sm:text-sm md:text-base">
        {content}
      </section>
    </main>
  );
}
