"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


import { BackspaceBtn, SqureBtn } from '@/ui/ui'
import { Search, LibraryBig, MessageCircleQuestionMark } from 'lucide-react';
import style from '@/ui/input.module.scss'

export default function Page() {
  const [books, setBooks] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const router = useRouter();

  async function handleSearch() {
    const res = await fetch(`/api/aladin?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setBooks(data.item ?? []);
    setHasSearched(true);
  }

  function handleSelectBook(book: any) {
    const query = new URLSearchParams({
      title: book.title,
      author: book.author,
      cover: book.cover
    }).toString();

    router.push(`/write?${query}`);
  }
  const formatDate = (date: Date | null) => {
    if(!date) return "";
    return new Intl.DateTimeFormat("ko-KR",{
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  }


  return (
    <div className="flex flex-col h-screen md:h-full">
      <BackspaceBtn/>
      <div className="flex justify-center gap-2 py-8 px-4" style={{background: 'var(--c-point)'}}>
        <input
          className={`${style.default} w-full md:max-w-[20rem]`}
          value={query}
          placeholder="검색어를 입력하세요"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e)=>{
              if (e.key === 'Enter'){handleSearch();}
          }}
        />
        <SqureBtn onClick={handleSearch}>
          <Search color='var(--c-border)' size={24}/>
        </SqureBtn>
      </div>
      <div className="flex-1 overflow-y-scroll" >
          {books.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center">
              {hasSearched?
              <>
                <MessageCircleQuestionMark size={64} color='var(--c-border)'/>
                <p className="mt-4 text-[var(--c-font)]"><span className="text-[var(--c-border)]">'{query}'</span> 를 찾을 수 없습니다.</p>
              </>
              :<>
                <LibraryBig size={64} color='var(--d-gr2)' />
                <p className="mt-4 text-[var(--d-gr2)]">검색어를 입력해주세요.</p>
              </>}
            </div>
          ) : (
            <ul className=''>
              {books.map((book) => (
                <li
                  key={book.isbn}
                  className="grid grid-cols-3 xs:grid-cols-4 gap-4 p-4 cursor-pointer hover:bg-[var(--c-background)]"
                  onClick={() => handleSelectBook(book)}
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full"
                  />
                  <div className="col-span-2 xs:col-span-3 pt-2">
                    <b className="xs:text-lg font-semibold line-clamp-3 xs:line-clamp-2">{book.title}</b>
                    <i className="block my-2 text-sm xs:text-base not-italic truncate">{book.author}</i>
                    <span className="text-sm">{formatDate(book.pubDate)} 발매</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
}



              