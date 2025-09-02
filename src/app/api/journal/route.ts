import { NextRequest, NextResponse } from 'next/server';
import { createClient as createServerClient } from '@/utils/supabase/server';


export async function POST(req: NextRequest) {
    const supabase = await createServerClient();
  try {
    const body = await req.json();

    const { book_title, book_author, book_cover, start_date, end_date, rating, content, password, secret } = body;

    if (!book_title || !book_author || !start_date || !content || !password || !rating) {
      return NextResponse.json({ error: '필수 항목 누락' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('reading_journal')
      .insert([{
        book_title, book_author, book_cover, start_date, end_date, rating, content, password,secret }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}