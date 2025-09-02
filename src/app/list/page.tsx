import React from 'react'
import { createClient } from '@/utils/supabase/server';
import JournalList from '@/app/list/JounalList';

export default async function FetchList() {
  const supabase = await createClient();
  const { data: reading_journal, error } = await supabase
    .from('reading_journal')
    .select('*')
    .order('end_date', { ascending: false });

  if (error) {
    console.error(error);
    return <div>{error.message}</div>;
  }

  
  
  return(
    <JournalList journals={reading_journal ?? []}/>
  );
}