import React, { useState }  from 'react'
import { SqureBtn, Popup } from '@/ui/ui'
import style from '@/ui/input.module.scss'

interface PopupProps {
  onConfirm: (password: string) => void;
  onClose: () => void;
}

export default function JournalPopup({onConfirm, onClose}:PopupProps) {
    const [password, setPassword] = useState('');

    return (
        <Popup onClose={onClose}>
            <p className='mb-2'>비밀번호를 입력하세요.</p>
            <input
                type="password"
                className={`${style.default}`}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e)=>{
                    if (e.key === 'Enter'){onConfirm(password);}
                }}
            />
            <SqureBtn className='mt-4 bg-[var(--c-border)] text-[var(--c-content)]' onClick={()=>onConfirm(password)}>확인</SqureBtn>
        </Popup>
    )
}
