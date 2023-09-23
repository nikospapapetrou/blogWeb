import "./globals.css";
import Navabar from "./components/Navabar";
import Footer from "./components/Footer";
import Loading from "./loading";
import { Suspense } from "react";

export const metadata = {
  metadataBase: new URL("https://nikospap.blog"),
  title: {
    default: "nikospap",
    template: `%s | nikospap`,
  },
  description: "History and articles blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="el">
      <body className="min-h-screen bg-gray-200 font-roboto flex flex-col">
        <Navabar />
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <Footer />
      </body>
    </html>
  );
}
