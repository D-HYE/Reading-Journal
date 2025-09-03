'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

import Layout from '@/components/JournalLayout';

import { BackspaceBtn, SqureBtn } from '@/ui/ui'

export default function Page() {
  const router = useRouter();
  // 책 정보
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const author = searchParams.get('author');
  const cover = searchParams.get('cover')?? '';

  const [journal, setJournal] = useState<Journal>({
    book_title: title?? '',
    book_author: author?? '',
    book_cover: cover,
    start_date: new Date(),
    end_date: new Date(),
    rating: null as number | null,
    content: '' ,
    password: '',
    secret: false
  } );

  const handleChange = (field: keyof Journal, value: any) => {
    setJournal((prev) => ({ ...prev, [field]: value }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/journal', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(journal)
    })
    
    const result = await res.json();

    if (res.ok) {
      alert('노트가 성공적으로 저장되었습니다!');
      router.push('/');
      console.log(journal)
    } else {
      alert('노트 저장 실패: ' + result.error);
    }
  }
  
  

  return (
    <div >
      <BackspaceBtn/>
      <form action=""  onSubmit={handleSubmit}>
        <Layout journal={journal} mode='write' onChange={handleChange}/>
        <div className="flex justify-center gap-2 py-8">
            <Link href="/"><SqureBtn className='bg-[var(--d-gr2)] text-[var(--d-gr1)]'>취소</SqureBtn></Link>
            <SqureBtn className='text-[var(--c-border)]' >저장</SqureBtn>
        </div>
      </form>
    </div>
  );
}