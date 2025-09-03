import Link from 'next/link';
import { BackspaceBtn, SqureBtn } from '@/ui/ui'
import { Milestone } from 'lucide-react';

export default function notFound() {
  return (
    <div>
      <BackspaceBtn/>
      <div className='flex flex-col justify-center items-center gap-8 py-12 px-2'>
        <div className='py-8 text-center text-[var(--c-border)] border-b-1'>
          <h2 className='text-8xl font-black'>404</h2>
          <p className='mt-2 text-4xl font-bold'>Not Found</p>
        </div>
        <div className="flex gap-2 text-[var(--c-font)]">
            <Milestone size={48}/>
            <div className='pt-2' >
              <b className='text-lg font-medium'>페이지를 찾을 수 없습니다.</b>
              <p className='mt-2 text-[var(--c-border)] text-base/6'>입력하신 페이지의 주소를 다시 한번 확인해 주시길 바랍니다.</p>
            </div>
        </div>
              <Link href="/" className=''><SqureBtn className='mt-12 bg-[var(--c-background)] text-[var(--c-border)] text-lg font-bold'>목록으로 돌아가기</SqureBtn></Link>
      </div>
    </div>
  )
}
