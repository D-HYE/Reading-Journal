'use client'; 

import { createClient } from '@/utils/supabase/client';

import React, { useEffect, useState }  from 'react'
import { useSearchParams, usePathname } from 'next/navigation';

import JournalEditor from '@/app/edit/JournalEditor';
import JournalDetail from '@/app/list/detail/JournalDetail';
import { Loading } from '@/ui/ui'

export default function JournalFetch() {
    const journalParams = useSearchParams();
    const id = journalParams.get('id');
    const pathname = usePathname();

    const [journal, setJournal] = useState<Journal | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            const supabase = await createClient();
            const { data, error } = await supabase
                .from('reading_journal')
                .select('*')
                .eq('journal_id', id)
                .single();

            if (!error && data) setJournal(data as Journal);
        };

        fetchData();
    }, [id]);

    if (!journal) return <Loading>독서노트 불러오는 중...</Loading>;

    return (
      <>
        {pathname?.startsWith('/edit')?<JournalEditor journal={journal} />:<JournalDetail journal={journal} />}
      </>
    )

}
