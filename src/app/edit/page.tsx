import { Suspense } from "react";
import JournalFetch from "@/components/JournalFetch";
import { Loading } from '@/ui/ui'

export default function Page() {
  return (
    <Suspense fallback={<Loading>독서노트 불러오는 중...</Loading>}>
      <JournalFetch />
    </Suspense>
  );
}