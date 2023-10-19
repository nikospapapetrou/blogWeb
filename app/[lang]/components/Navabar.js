import Links from "./navigation/Links";
import { getDictionary } from "@/lib/dictionary";

export default async function Navabar({ params }) {
  const { navigation } = await getDictionary(params);
  return (
    <section className="bg-darkblue fixed w-screen z-40 h-16 justify-around">
      <Links lang={params} navigation={navigation} />
    </section>
  );
}
