"use client";

import { createClient } from '@/utils/supabase/client';

import React, { useState }  from 'react'
import { useRouter } from 'next/navigation';

import Layout from '@/components/JournalLayout';
import { BackspaceBtn, SqureBtn } from '@/ui/ui'

export default function JournalEditor({journal}:{journal:Journal}) {
    const [localJournal, setLocalJournal] = useState(journal);
    const router = useRouter();

    const handleChange = (field: keyof Journal, value: any) => {
        setLocalJournal((prev) => ({ ...prev, [field]: value }));
    };

    const saveJournal = async () =>{
        if (!localJournal) return;
        const supabase = await createClient();
        const { error } = await supabase
            .from('reading_journal')
            .update({
                book_title: localJournal.book_title,
                book_cover: localJournal.book_cover,
                book_author: localJournal.book_author,
                start_date: localJournal.start_date,
                end_date: localJournal.end_date,
                rating: localJournal.rating,
                content: localJournal.content,
                password: localJournal.password,
                secret: localJournal.secret
            })
            .eq('journal_id', localJournal.journal_id)
            .single();

        if (error) {
            console.error('업데이트 실패', error);
            alert('노트 수정 실패하였습니다.');
            return;
        }
        alert('노트 수정을 완료하였습니다.');
        router.push(`/list/detail?id=${localJournal.journal_id}&from=edited`);
    }

    return (
        <div>
          <BackspaceBtn/>
          <Layout mode='edit' journal={localJournal} onChange={handleChange} />
          <div className="flex justify-center py-8">
            <SqureBtn className='text-[var(--c-border)]' onClick={saveJournal}>저장</SqureBtn>
          </div>
        </div>
    )
}
