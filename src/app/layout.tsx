import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import ThemeBtn from '@/components/ThemeChange';

import "react-datepicker/dist/react-datepicker.css";
import "@/app/globals.css";
import "@/styles/componentsCustom.css";



export const metadata: Metadata = {
  title: "다혜의 독서 노트",
  description: "Next.js(TypeScript)와 Supabase를 활용해 데이터 저장과 배포까지 관리 할 수 있는 독서 노트로 실사용을 위해 만들었습니다.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/favicon-192x192.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "var(--d-sbl)",
  openGraph: {
    title: "다혜의 독서 노트",
    description: "Next.js(TypeScript)와 Supabase를 활용해 데이터 저장과 배포까지 관리 할 수 있는 독서 노트로 실사용을 위해 만들었습니다.",
    url: "https://reading-journal-one.vercel.app/",
    siteName: "다혜의 독서 노트",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "다혜의 독서노트"
      }
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "다혜의 독서노트",
    description: "Next.js(TypeScript)와 Supabase를 활용해 데이터 저장과 배포까지 관리 할 수 있는 독서 노트로 실사용을 위해 만들었습니다.",
    images: ["/og-image.jpg"],
  },
};


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-[var(--c-content)] md:bg-[var(--c-background)] text-[var(--c-font)]">
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex justify-center items-center h-sm md:h-screen">
            <div style={{background: 'var(--c-content)', borderColor: 'var(--c-border)'}} className="relative w-full md:max-w-[calc(48rem-2rem)] md:h-[48rem] md:border-2 md:rounded-xl">
              {children}
              <ThemeBtn/>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
