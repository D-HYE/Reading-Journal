import { createClient } from '@/utils/supabase/client';

export async function checkPassword(
  inputPw: string,
  journalPw?: string
) {
  return inputPw === journalPw;
}

export async function deleteJournal(journal_id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('reading_journal')
    .delete()
    .eq('journal_id', journal_id);
  return error;
}
