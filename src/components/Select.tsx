'use client';
import React, { useState } from 'react'
import {ChevronDown, ChevronUp} from 'lucide-react';

interface Option{
    value: string;
    label: string;
}
interface SelectedProps{
    options: Option[];
    onChange?: (value: string) => void;
    initLabel?: string;
    className?: string;
}

export default function Select({options, onChange, initLabel, className}: SelectedProps) {
    // 필터 열기
    const [open, setOpen] = useState(false);
    function handleToggle(){setOpen(prev => !prev);}

    // 옵션 선택
    const [selected, setSelected] = useState<Option|null>(null);
    const optionChange = (option: Option) => {
        setSelected(option);
        onChange?.(option.value);
        setOpen(false);
    }

    return (
        <div className={`relative ${className}`}>
            <div className='flex justify-between items-center gap-2 pl-4 pr-2 py-2 font-medium cursor-pointer' onClick={handleToggle}><span>{selected ? selected.label : initLabel}</span><div>{open ? <ChevronUp/> : <ChevronDown/>}</div></div>
            {open && (
                <ul className={`absolute top-[calc(100%+0.5rem)] z-5 left-0 w-full bg-[var(--c-content)] border-1 border-[var(--d-gr2)] ${open ? 'block' : 'hidden'} rounded-md shadow-md cursor-pointer`}>
                    {options.map((option) => (
                        <li key={option.value}
                            className='px-4 py-2 first:pt-4 last:pb-4 hover:text-[var(--c-border)]'
                            onClick={() => optionChange(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
