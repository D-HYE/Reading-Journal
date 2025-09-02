import Link from 'next/link';
import List from '@/app/list/page';
import { RoundBtn } from '@/ui/ui'
import { PencilLine, NotebookPen } from 'lucide-react';

export default function Home() {
  return (
    <div className=''>
      <div className='p-4 md:rounded-t-md' style={{background: 'var(--d-or)'}}>
        <h2 className='flex items-center gap-2 text-2xl font-bold'><NotebookPen strokeWidth={2.5} />다혜의 독서노트</h2>
      </div>
      <div className="fixed md:absolute right-6 bottom-6 z-50">
        <Link href="/search" >
          <RoundBtn className='p-4 shadow-md bg-[var(--c-border)]'>
            <PencilLine color='var(--c-background)' size={28}/>
          </RoundBtn>
        </Link>
      </div>
      <List/>
    </div>
  );
}
