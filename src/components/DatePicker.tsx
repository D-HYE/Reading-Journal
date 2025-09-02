import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';

type DateRange = { start: Date | null; end: Date | null }
type DateProps = {
    dateVal?: DateRange;
    onChange?: (range: DateRange) => void
    readOnly?: boolean;
}

export default function Calandar({ dateVal, onChange, readOnly = false }:DateProps) {
  //선택 날짜
  const [startDate, setStartDate] = useState<Date | null>(dateVal?.start??new Date());
  const [endDate, setEndDate] = useState<Date | null>(dateVal?.end??null);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    if (dateVal) {
      setStartDate(dateVal.start ?? new Date());
      setEndDate(dateVal.end ?? null);
    };
  }, [dateVal]);
  
  const dateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onChange?.({ start, end});
    if (end) setOpen(false);
  };

  //날짜 형식
  const formatDate = (date: Date | null) => {
    if(!date) return "";
    return new Intl.DateTimeFormat("ko-KR",{
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }

  // 여닫기
  function handleToggle(){
    if(readOnly) return;
    setOpen(prev => !prev);
  }
  
  return (
    <div className="flex gap-2 xs:gap-x-4 xs:gap-y-0 xs:flex-col">
        <span className='font-bold text-sm xs:text-base'>독서 기간</span>
        <div className='relative'>
          <div className='flex items-center text-sm xs:text-base cursor-pointer' onClick={handleToggle}>
            <div className="start">{formatDate(startDate)}</div>
            {startDate && endDate && startDate.getTime() !== endDate.getTime() ? (
              <div className="end flex items-center"><span className='px-2'>-</span>{endDate ? formatDate(endDate) : ""}</div>
            ):null}
          </div>
          {open && (
            <DatePicker
            selected={startDate}
            onChange={dateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            />
          )}
        </div>
      </div>
  )  
}