'use client';
import React, { useState, useRef, useEffect } from 'react'
import {ChevronDown, ChevronUp} from 'lucide-react';

interface Option{
    value: string;
    label: string;
}
interface SelectedProps{
    options: Option[];
    value?: string;   
    onChange?: (value: string) => void;
    initLabel?: string;
    className?: string;
}

export default function Select({options, value, onChange, initLabel, className}: SelectedProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // 선택 옵션값
    const selected = options.find(opt => opt.value === value);
    
    // 필터 열기
    function handleToggle(){setOpen(prev => !prev);}

    // 외부 클릭 감지, 필터 닫기
    useEffect(() => {
        const handler = (e: MouseEvent) => {
        if (!ref.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);



    return (
        <div ref={ref} className={`relative ${className}`}>
            <div className='flex justify-between items-center gap-2 pl-4 pr-2 py-2 font-medium cursor-pointer' onClick={handleToggle}><span>{selected ? selected.label : initLabel}</span><div>{open ? <ChevronUp/> : <ChevronDown/>}</div></div>
            {open && (
                <ul className={`absolute top-[calc(100%+0.5rem)] z-5 left-0 w-full bg-[var(--c-content)] border-1 border-[var(--d-gr2)] ${open ? 'block' : 'hidden'} rounded-md shadow-md cursor-pointer`}>
                    {options.map((option) => (
                        <li key={option.value}
                            className='px-4 py-2 first:pt-4 last:pb-4 hover:text-[var(--c-border)]'
                            onClick={() => {
                                onChange?.(option.value);
                                setOpen(false);
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
