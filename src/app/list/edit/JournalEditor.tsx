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
        if (!journal) return;
        const supabase = await createClient();
        const { error } = await supabase
            .from('reading_journal')
            .update({
                book_title: journal.book_title,
                book_cover: journal.book_cover,
                book_author: journal.book_author,
                start_date: journal.start_date,
                end_date: journal.end_date,
                rating: journal.rating,
                content: journal.content,
                password: journal.password,
                secret: journal.secret
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
