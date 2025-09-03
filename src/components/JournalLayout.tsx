'use client';

import React from 'react'
//component
import Calandar from '@/components/DatePicker'
import StarRate from '@/components/StarRate'

//ui
import { Trash, Check } from 'lucide-react';
import { NoImage } from '@/ui/ui'
import style from '@/ui/input.module.scss'

interface JournalProps {
    mode: 'write' | 'edit' | 'detail';
    journal: Journal;
    onChange?: (field: keyof Journal, value: any) => void;
    onDeleteClick?: ()=>void;
}

export default function JournalLayout({mode, journal, onChange, onDeleteClick}: JournalProps) {
    const readOnly = mode === 'detail';

    return (
        <div className=''>
            <div className='xs:px-4 xs:py-4 xs:grid xs:grid-cols-3 xs:gap-4 md:gap-8 border-b-2' style={{borderColor:'var(--c-border)'}}>
                <div className='flex justify-center items-center py-4 xs:p-0' style={{background: 'var(--c-background)'}}>
                    {journal.book_cover ? (
                        <img src={journal.book_cover} alt={journal.book_title} className='w-1/2 xs:w-full md:max-h-[20rem] mx-auto'/>
                    ):(
                        <NoImage />
                    )}
                </div>
                <div className='relative xs:col-span-2 pt-4 pb-8 xs:py-2 px-4 xs:px-0'>
                    <b className='mb-2 xs:text-xl font-bold line-clamp-2'>{journal.book_title ?? '책 제목'}</b>
                    <span className='block text-sm truncate'>{journal.book_author ?? '글쓴이'}</span>
                    <div className='my-4 '>
                        <Calandar
                            dateVal={{start: journal.start_date ? new Date(journal.start_date) : null, end: journal.end_date ? new Date(journal.end_date) : null}}
                            readOnly={readOnly}
                            onChange={
                                mode !== 'detail' ? (v) => {
                                    onChange?.('start_date', v.start );
                                    onChange?.('end_date', v.end );
                                }: undefined
                            }
                        />
                    </div>
                    <div className='rate'>
                        <StarRate
                            rateVal={journal.rating ?? 0}
                            readOnly={readOnly}
                            onChange={mode !== 'detail' ? (v)=>onChange?.('rating', v) : undefined}
                        />
                    </div>
                    {mode === 'detail' ? (
                        <button className='absolute right-2 xs:right-0 bottom-2 xs:bottom-0 flex items-center gap-1 text-sm text-[var(--d-gr2)] cursor-pointer' onClick={onDeleteClick}><Trash size={16} strokeWidth={3}/> 삭제하기</button>
                    ):null}
                </div>
            </div>
            <div className='px-4 py-8 text-base/6' style={{background: 'var(--c-point)'}}>
                {readOnly ? (
                    <div>
                        <p className='min-h-[10rem]'>{journal.content}</p>
                    </div>
                ) : (
                    <textarea
                        name="content" id="content"
                        className={`${style.textarea} w-full min-h-[10rem]`}
                        value={journal.content ?? ''}
                        onChange = {(v) => onChange?.('content', v.target.value)}
                    />
                )}
                {!readOnly ? (
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 mt-2">
                            <b className='font-bold'>비밀번호</b>
                            <input
                                type="password"
                                name="password" id="password"
                                className={`${style.default} text-xs`}
                                value={journal.password ?? ''}
                                onChange = {(v) => onChange?.('password', v.target.value)}
                            />
                        </div>
                        <div className={`mt-2 ${style.checkbox}`}>
                            <input
                                type="checkbox"
                                name="secret" id="secret"
                                className={`hidden`}
                                checked={journal.secret??false}
                                onChange = {(v) => onChange?.('secret', v.target.checked)}
                            />
                            <label htmlFor="secret" className={`relative flex items-center gap-2 font-bold`}>
                                <span>비밀글 설정</span>
                                {journal.secret?<Check size={44} strokeWidth={3} color={'var(--c-border)'} className='absolute top-[-0.5rem] right-[-0.5rem] cursor-pointer'/>:null}
                            </label>
                        </div>
                    </div>
                ): null}
          </div>
        </div>
    )
}
