import "./globals.css";
import Navabar from "./components/Navabar";
import Footer from "./components/Footer";
import Loading from "./loading";
import { Suspense } from "react";
import Script from "next/script";
import { Locale, i18n } from "@/i18n.config";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";

export const metadata = {
  metadataBase: new URL("https://nikospap.blog"),
  title: {
    default: "nikospap",
    template: `%s | nikospap`,
  },
  description: "History and articles blog",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.lang}>
      <body className="min-h-screen bg-gray-200 font-roboto flex flex-col overflow-x-hidden">
        <Navabar params={params.lang} />
        <ErrorBoundary fallback={<Error />}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ErrorBoundary>
        <Footer params={params.lang} />

        {/* <Script>{`
          var _mtm = window._mtm = window._mtm || [];
  _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
  (function() {
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src='https://cdn.matomo.cloud/nikospapblog.matomo.cloud/container_oSCceY0L.js'; s.parentNode.insertBefore(g,s);
  })();
      `}</Script> */}
      </body>
    </html>
  );
}
