"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/img/logo.png";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function Navabar() {
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

  const navLinks = [
    { id: 1, name: "Αρχική", href: "/" },
    { id: 2, name: "Ιστορία", href: "/history" },
    { id: 3, name: "Άρθρα", href: "/posts" },
    { id: 4, name: "Επικοινωνία", href: "/contact" },
    { id: 5, name: "About", href: "/about" },
  ];

  const renderLinks = () => {
    return navLinks.map((link) => {
      const pathname = usePathname();
      const isActive = pathname.endsWith(link.href);
      return (
        <motion.li
          key={link.id.toString()}
          className="py-1 sm:py-0 sm:pl-6 sm:opacity-100"
          variants={itemVariants}
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
        </motion.li>
      );
    });
  };
  return (
    <section className="flex items-center bg-darkblue fixed w-full z-40  h-14">
      <motion.nav
        ref={menuRef}
        className="sm:flex sm:flex-row sm:items-center text-white max-w-4xl mx-auto w-full"
        initial="closed"
        animate={isChecked ? "open" : "closed"}
      >
        <div className="flex flex-row justify-between w-full">
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
        <motion.ul
          className="sm:flex absolute bg-darkblue w-screen pl-4 pt-5 sm:pt-0 sm:pl-0 sm:static sm:pr-7"
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            closed: {
              clipPath: "inset(10% 50% 90% 50% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
        >
          {renderLinks()}
        </motion.ul>
      </motion.nav>
    </section>
  );
}
