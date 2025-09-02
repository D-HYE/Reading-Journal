'use client'; 

import React, { useState }  from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { checkPassword, deleteJournal } from '@/utils/passwordConrim';

import Layout from '@/components/JournalLayout';
import JournalPopup from '@/components/JournalPopup';
import { BackspaceBtn, SqureBtn } from '@/ui/ui'

export default function JournalDetail({journal}:{journal:Journal}) {
    const router = useRouter();

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const editPwConfirm = async (password: string) => {
        const ok = await checkPassword(password, journal.password);
        if (ok) {
          router.push(`/edit?id=${journal.journal_id}`);
        } else {
          alert('비밀번호가 일치하지 않습니다!');
        }
        setEditOpen(false);
      };

    const deletePwConfirm = async (password: string) => {
      const ok = await checkPassword(password, journal.password);
      if (!ok) {
        alert('비밀번호가 일치하지 않습니다!');
        return;
      }

      const error = await deleteJournal(journal.journal_id!);
      if (error) {
        alert('독서노트 삭제에 실패했습니다.');
        return;
      }

      alert('독서노트를 삭제하였습니다.');
      router.push('/');
      setDeleteOpen(false);
    };


    return (
        <div>
            <BackspaceBtn/>
            <Layout mode='detail' journal={journal} onDeleteClick={() => setDeleteOpen(true)}/>
            <div className="flex justify-center gap-2 py-8">
                <Link href="/"><SqureBtn className='bg-[var(--d-gr2)] text-[var(--d-gr1)]'>목록</SqureBtn></Link>
                <SqureBtn className='text-[var(--c-border)]' onClick={()=>setEditOpen(true)}>수정</SqureBtn>
            </div>
            {editOpen && (
                <JournalPopup
                onConfirm={editPwConfirm}
                onClose={() => setEditOpen(false)}
                />
            )}
            {deleteOpen && (
                <JournalPopup
                onConfirm={deletePwConfirm}
                onClose={() => setDeleteOpen(false)}
                />
            )}
        </div>
    )
}
