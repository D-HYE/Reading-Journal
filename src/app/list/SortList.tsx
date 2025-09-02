'use client';

import React, { useState } from 'react'
import Select from '@/components/Select';

interface SortListProps {
  onSortChange?: (value: string) => void;
  onYearChange?: (value: string) => void;
}

export default function SortList({onSortChange, onYearChange }:SortListProps) {

    const yearSelector = [
        { value: 'all', label: '전체보기' },
        { value: '2025', label: '2025' },
        { value: '2024', label: '2024' },
        { value: '2023', label: '2023' },
        { value: '2022', label: '2022' },
        { value: '2021', label: '2021' },
        { value: '2020', label: '2020' },
    ]
    const sortSelector = [
        { value: 'new', label: '최신순' },
        { value: 'high', label: '높은별점순' },
        { value: 'low', label: '낮은별점순' },
    ]

    return (
        <div className="flex justify-end gap-2 px-4 border-b-1 border-[var(--d-gr2)]">
            <Select
            options = {sortSelector}
            initLabel = '최신순'
            onChange={onSortChange}
            className='min-w-[8.125rem]'
            />
            <Select
            options = {yearSelector}
            initLabel = '전체보기'
            onChange={onYearChange}
            className='min-w-[7rem]'
            />
        </div>
    )
}
