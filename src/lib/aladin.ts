export async function aladinFetch(query: string) {
  const TTB_KEY = process.env.TTB_KEY;
  const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${TTB_KEY}&Query=${encodeURIComponent(
    query
  )}&QueryType=Keyword&MaxResults=30&SearchTarget=Book&output=js&Version=20131101`;


  const res = await fetch(url);
  if (!res.ok) throw new Error("알라딘 API 요청 실패");
  return res.json();
}
