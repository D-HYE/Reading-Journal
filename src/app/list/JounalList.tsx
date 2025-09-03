'use client';

import React, { useState, useMemo }  from 'react'
import { useRouter } from 'next/navigation';

import SortList from '@/app/list/SortList';
import JournalPopup from '@/components/JournalPopup';

import { NoImage} from '@/ui/ui';
import { Star, Lock } from 'lucide-react';

interface DataProps {
  journals: Journal[];
}

export default function JournalList({journals}: DataProps) {
  const router = useRouter();
  const [selectedNote, setSelectedNote] = useState<Journal | null>(null);
  const [secretOpen, setSecretOpen] = useState(false);

  const [sort, setSort] = useState('new');
  const [year, setYear] = useState('all');

  const filteredJournals = journals
  
  .filter(j => {
    if (year === 'all') return true;
    return j.end_date?.toString().startsWith(year) ?? false;
  })
  .sort((a, b) => {
    if (sort === 'new') return new Date(b.end_date!).getTime() - new Date(a.end_date!).getTime();
    if (sort === 'old') return new Date(a.end_date!).getTime() - new Date(b.end_date!).getTime();
    if (sort === 'saved') return new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime();
    if (sort === 'high') return (b.rating ?? 0) - (a.rating ?? 0);
    if (sort === 'low') return (a.rating ?? 0) - (b.rating ?? 0);
    return 0;
  });
  
  const journalCount = filteredJournals.length;

  const handleSecret = (note:Journal) =>{
    if(note.secret){
      setSelectedNote(note)
      setSecretOpen(true);
    }else{
      router.push(`/list/detail?id=${note.journal_id}`);
    };
  }
  
  const secretPwConfirm = async (password: string) =>{
    if(selectedNote&& password === selectedNote.password){
      router.push(`/list/detail?id=${selectedNote.journal_id}`);
    }else {
      alert('비밀번호가 일치하지 않습니다!');
    } 
     
  }



  return(
    <div>
      <SortList sort={sort} year={year} onSortChange={setSort} onYearChange={setYear}/>
      <div className='md:h-[40rem] overflow-y-scroll'>
        <div className='px-4 py-2 bg-[var(--d-gr2)] text-[var(--d-gr1)] text-sm'>{journalCount} 권의 노트가 작성되었습니다.</div>
        <ul className='grid grid-cols-3 xs:grid-cols-4 gap-2 p-4 pl-2 '>
          {filteredJournals.map((note) => (
            <li key={note.journal_id}
              className='pb-4 cursor-pointer '
              onClick={()=>handleSecret(note)}
            >
              <div className='relative flex justify-center items-center py-2 h-[42.133vw] xs:h-[29.829vw] md:h-[13.75rem] bg-[var(--c-background)] rounded-md'>
                {note.book_cover ? (
                  <img src={note.book_cover}
                    alt={note.book_title}
                    className='h-full'
                  />
                ):(<NoImage />)}
                {note.secret === true ? (
                  <div className='absolute right-[0.5rem] bottom-[0.5rem] p-2 bg-[var(--c-point)] rounded-full'><Lock size={20} strokeWidth={3}/></div>
                ):null}
              </div>
              <div>
                <b className='my-2 px-2 md:text-xl font-semibold line-clamp-2'>{note.book_title}</b>
                <div className='flex items-center flex-wrap gap-1 px-2 text-sm text-[var(--c-border)]'>
                  <span className='flex items-center'>평점<Star size={16} strokeWidth={0} fill='var(--c-border)'/></span>
                  <span>{note.rating} 점</span>
                </div>
              </div>

            </li>
          ))}
        </ul>
        {selectedNote && secretOpen && (
          <JournalPopup
            onConfirm={secretPwConfirm}
            onClose={()=>setSecretOpen(false)}
          />
        )}
      </div>
    </div>
  )
}