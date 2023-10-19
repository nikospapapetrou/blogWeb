"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/img/logo.png";
import { useState, useEffect, useRef } from "react";
import Language from "../Language";

export default function Links({ lang, navigation }) {
  const [isChecked, setIsChecked] = useState(false);
  const [width, setWidth] = useState(null);
  const menuRef = useRef();
  const handleMenuBtn = (e) => {
    if (e.target.checked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  useEffect(() => {
    if (width < 640) {
      let handler = (e) => {
        if (!menuRef.current.contains(e.target)) {
          setIsChecked(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
  }, [width]);

  useEffect(() => {
    const width = window.innerWidth;
    setWidth(width);
    if (width > 640) {
      setIsChecked(true);
    } else if (width < 640) {
      setIsChecked(false);
    }
  }, [width]);

  console.log(isChecked);
  const navLinks = [
    { id: 1, name: navigation.home, href: `/${lang}` },
    { id: 2, name: navigation.history, href: `/${lang}/history` },
    { id: 3, name: navigation.posts, href: `/${lang}/posts` },
    { id: 4, name: navigation.contact, href: `/${lang}/contact` },
    { id: 5, name: navigation.about, href: `/${lang}/about` },
  ];

  const renderLinks = () => {
    return navLinks.map((link) => {
      const pathname = usePathname();
      const isActive = pathname.endsWith(link.href);
      return (
        <li
          key={link.id.toString()}
          className="py-1 sm:py-0 sm:pl-6 sm:opacity-100"
        >
          <Link
            className={
              isActive
                ? "text-red-600 hover:text-red-600 cursor-pointer text-sm sm:text-base"
                : "hover:text-red-600 cursor-pointer text-sm sm:text-base"
            }
            href={link.href}
          >
            {link.name}
          </Link>
        </li>
      );
    });
  };
  return (
    <nav
      ref={menuRef}
      className="mt-4 sm:mt-0 pr-3 sm:flex text-white max-w-5xl mx-auto h-full w-full"
    >
      <div className="flex flex-row items-center justify-between w-full">
        <Link
          className="pl-3 flex flex-row items-center text-xl md:text-2xl tracking-wide"
          href="/"
        >
          <Image
            width={300}
            height={300}
            className="w-9 h-auto pr-2"
            src={Logo}
            alt="Logo of the blog"
          />
          nikospap
        </Link>

        {/* Menu Button strats here */}
        <label className="hamburger sm:hidden pr-3">
          <input
            onClick={handleMenuBtn}
            checked={isChecked ? true : false}
            type="checkbox"
            readOnly
          />
          <svg viewBox="0 0 32 32">
            <path
              className="line line-top-bottom"
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            ></path>
            <path className="line" d="M7 16 27 16"></path>
          </svg>
        </label>
        {/* Menu Button ends here */}
      </div>
      <ul
        className={`${
          isChecked ? "" : "hidden"
        } sm:flex bg-darkblue w-screen pl-4 pt-5 sm:pt-0 sm:pl-0 sm:static sm:pr-7 sm:h-16 sm:content-center items-center`}
      >
        {renderLinks()}
        <li className="relative sm:ml-8 mt-2">
          <Language lang={lang} />
        </li>
      </ul>
    </nav>
  );
}
