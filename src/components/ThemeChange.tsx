"use client";

import { useTheme } from 'next-themes';
import { RoundBtn } from '@/ui/ui';

import { Sun, Moon } from 'lucide-react';

export default function ThemeChange() {
    const { theme, setTheme } = useTheme();

    return (
        <div
            className={`flex ${theme === 'dark'?'justify-end':''} absolute top-[0.25rem] md:top-[-1rem] right-[0.5rem] w-[4rem] rounded-full border-2 duration-300`}
            style={{background: 'var(--c-background)', borderColor: 'var(--c-border)'}}
        >
            <RoundBtn onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className='bg-[var(--c-point)]'>
                {theme === 'dark' ? <Sun color='var(--c-border)' size={16} strokeWidth={3}/> : <Moon color='var(--c-border)' size={16} strokeWidth={3}/> }
            </RoundBtn>
        </div>
    );
}
