import { Suspense } from "react";
import JournalForm from '@/app/write/JournalForm'
import { Loading } from '@/ui/ui'

export default function Page() {
  return (
    <Suspense fallback={<Loading>글쓰기 페이지 불러오는 중...</Loading>}>
      <JournalForm />
    </Suspense>
  );
}