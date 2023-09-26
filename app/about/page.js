import Image from "next/image";
import Nikos from "../../public/img/Papapetrou_Nikos.jpg";
import Philip_Sheild from "../../public/img/shield.jpg";
import Cheimaditida from "../../public/img/cheimaditida.jpg";

export const metadata = {
  title: {
    absolute: "About",
  },
};

export default function About() {
  return (
    <main className="pt-28">
      <div className="flex flex-col items-center px-5">
        <Image
          className="rounded-lg mb-3 sm:w-80 h-auto"
          sizes="(min-width: 720px) 650px, calc(95.5vw - 19px)"
          src={Nikos}
          alt="Photo of blog owner"
        />
        <h2 className="pb-5 font-literata sm:text-2xl text-orange-700">
          Σχετικά με εμένα
        </h2>
        <div className="flex flex-col sm:flex-row justify-around items-center mb-6 sm:w-9/12">
          <p className="text-xs sm:text-sm md:text-base leading-relaxed sm:leading-7 break-normal mb-5 max-w-lg pr-6">
            Γεια σας, ονομάζομαι Παπαπέτρου Νίκος. Γεννήθηκα το 1991 στην
            Ολυμπιάδα Κοζάνης. Είμαι απόφοιτος Ιστορίας του Πανεπιστημίου
            Ιωαννίνων. Αυτό είναι το blog μου όπου μπορείτε να διαβάσετε άρθρα
            για την ιστορία, αλλά και της επικαιρότητας.
          </p>
          <Image
            width={500}
            height={500}
            sizes="(min-width: 640px) 320px, calc(100vw - 40px)"
            className="w-64 mb-5 sm:w-80"
            src={Philip_Sheild}
            alt="Philip's shield"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:w-9/12 mb-10">
          <p className="text-xs sm:text-sm sm:order-last md:text-base leading-relaxed sm:leading-7 break-normal mb-5 max-w-lg ml-5">
            Άλλα ενδιαφέροντα μου είναι η φωτογραφία τοπίου.
          </p>
          <Image
            // className="mb-5 sm:w-72 h-auto sm:grow"
            className="w-full h-auto"
            sizes="(min-width: 1000px) calc(75vw - 432px), (min-width: 640px) calc(4.41vw + 260px), calc(100vw - 40px)"
            src={Cheimaditida}
            alt="Λίμνη Χειμαδίτιδα"
          />
        </div>
      </div>
    </main>
  );
}
