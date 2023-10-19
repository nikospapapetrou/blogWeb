import dynamic from "next/dynamic";
import { getDictionary } from "@/lib/dictionary";

export async function generateMetadata({ params }) {
  const { page } = await getDictionary(params.lang);
  return {
    title: page.contact.title,
    description: page.contact.description,
    alternates: {
      canonical: `${params.lang}/contact`,
    },
  };
}

const ContactForm = dynamic(() => import("./ContactForm"), { ssr: false });

export default async function Contact({ params }) {
  const { page } = await getDictionary(params.lang);
  return (
    <section className="pt-32 mb-16">
      <ContactForm page={page} />
    </section>
  );
}
