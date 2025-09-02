import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import ThemeBtn from '@/components/ThemeChange';

import "react-datepicker/dist/react-datepicker.css";
import "@/app/globals.css";
import "@/styles/componentsCustom.css";



export const metadata: Metadata = {
  title: "다혜의 독서 노트",
  description: "Next.js(TypeScript)와 Supabase를 활용해 데이터 저장과 배포까지 관리 할 수 있는 독서 노트입니다.",
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
