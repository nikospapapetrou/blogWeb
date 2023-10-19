"use client";

import Greek from "../../../public/img/locale/greek.jpg";
import English from "../../../public/img/locale/english.jpg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { i18n } from "@/i18n.config";

export default function LocaleSwitcher({ lang }) {
  const [language, setLanguage] = useState(lang);
  const pathName = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const redirectedPathName = (locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const handleLanguageChange = (locale) => {
    setLanguage(locale);
    setIsModalOpen(false);
  };

  const renderLanguageOptions = () => {
    return (
      <>
        {lang === "el" ? (
          <Link href={redirectedPathName("en")}>
            <Image
              src={English}
              alt="English Flag"
              className="h-full w-8 z-40"
            />
          </Link>
        ) : (
          <Link href={redirectedPathName("el")}>
            <Image src={Greek} alt="Greek Flag" className="h-full w-8" />
          </Link>
        )}
      </>
    );
  };

  return (
    <div className="w-10 mr-11 h-6">
      <button className="cursor-pointer inline-block" onClick={toggleModal}>
        <Image
          src={language === "el" ? Greek : English}
          alt={language}
          className="h-full w-8"
        />
      </button>

      {isModalOpen && (
        <ul className="absolute top-8 p-2 right-100 bg-slate-300	rounded-lg shadow-xl w-16 h-12 overflow-visible">
          <li>{renderLanguageOptions()}</li>
        </ul>
      )}
    </div>
  );
}

// top-8 right-0 bg-white p-6 rounded-lg shadow-lg w-6
// {
//   /* <Image
// width={500}
// height={500}
// sizes="(min-width: 640px) 320px, calc(100vw - 40px)"
// className="w-64 mb-5 sm:w-80"
// src={Philip_Sheild}
// alt="Philip's shield"
// /> */
// }

// {
//   /* <ul className="flex gap-x-3">
//   {i18n.locales.map((locale) => {
//     return (
//       <li key={locale}>
//         <Link
//           href={redirectedPathName(locale)}
//           className="rounded-md border bg-black px-3 py-2 text-white"
//         >
//           {locale}
//         </Link>
//       </li>
//     );
//   })}
// </ul>; */
// }
// {
//   /* <li>
//         {" "}
//         <Link href={redirectedPathName("en")}>
//           <Image src={English} alt="English Flag" className="h-full w-6" />
//         </Link>
//       </li> */
// }
// {
//   /* <Link href={redirectedPathName("el")}>
//           <Image src={Greek} alt="Greek Flag" className="h-full w-6" />
//         </Link> */
// }
// // onClick={() => handleLanguageChange(language === "el" ? "en" : "el")}
// //href={redirectedPathName(language === "el" ? "en" : "el")}

// // {language === "el" && (
// //   <Link
// //     onClick={() => handleLanguageChange("en")}
// //     href={redirectedPathName("en")}
// //   >
// //     <Image src={English} alt="English Flag" className="h-full w-6" />
// //   </Link>
// // )}
// // {language === "en" && (
// //   <Link
// //     onClick={() => handleLanguageChange("el")}
// //     href={redirectedPathName("el")}
// //   >
// //     <Image src={Greek} alt="Greek Flag" className="h-full w-6" />
// //   </Link>
// // )}
// // className="flex flex-col gap-y-3 bg-white p-2 mr-4 relative w-10"
// // >
// // <div onChange={handleChange}></div>
// {
//   /* {params === "en" ? (
//   <Image src={English} alt="English Flag" className="h-full w-6" />
// ) : (
//   <Image src={Greek} alt="Greek Flag" className="h-full w-6" />
// )} */
// }
// {
//   /* <Image src={Greek} alt="Greek Flag" className="h-full w-6" /> */
// }
// {
//   /* <li className="absolute mt-8 w-10">
//   <Link
//     onClick={() => setLanguage(language === "el" ? "en" : "el")}
//     href={redirectedPathName(language === "el" ? "en" : "el")}
//   >
//     <Image
//       src={language === "el" ? English : Greek}
//       alt="English Flag"
//       className="h-full w-6"
//     />
//   </Link>
// </li> */
// }
