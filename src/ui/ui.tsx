"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, ImageOff, X, BookOpenText} from 'lucide-react';
import { Suspense } from "react";

type BtnProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export function SqureBtn({children, onClick, className}:BtnProps) {
  return (
    <button
      onClick={onClick}
      className={`w-fit flex justify-center items-center py-2 px-4 rounded-md cursor-pointer bg-[var(--c-background)] ${className}`}
    >
      {children}
    </button>
  )
}

export function RoundBtn({children, onClick, className}:BtnProps) {
  return (
    <button
      onClick={onClick}
      className={`w-fit flex justify-center items-center p-2 rounded-full cursor-pointer bg-[var(--c-background)] ${className}`}
    >
      {children}
    </button>
  )
}

function Backspace() {
  const router = useRouter();
  const searchParans = useSearchParams();
  const from = searchParans.get('from');

  const handleAccess = () =>{
    if (from === 'edited') {
      router.push('/')
    } else {
      router.back();
    }
  }

  return (
    <div className="border-b-2 p-2" style={{borderColor: 'var(--c-border)'}}>
      <button onClick={handleAccess} className="cursor-pointer">
        <ArrowLeft size={24} className="text-[var(--c-border)]"/>
      </button>
    </div>
  )
}

export function BackspaceBtn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Backspace />
    </Suspense>
  )
}

export function NoImage() {
  return (
    <div className="h-full flex justify-center items-center bg-[var(--d-gr2)]">
      <ImageOff size={48} color='var(--d-gr1)'/>
    </div>
  )
}

type PopupProps = {
  children: React.ReactNode;
  onClose: () => void; 
};

export function Popup({children, onClose}:PopupProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center">
      <div className="xs:max-w-md w-full h-full xs:h-fit border-2 rounded-xl shadow-md overflow-hidden" style={{borderColor: 'var(--c-border)', background: 'var(--c-content)'}}>
        <div className="flex justify-end p-2" style={{background: 'var(--c-border)'}}>
          <button className="cursor-pointer" onClick={onClose}>
            <X size={24} className="text-[var(--c-content)]"/>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center py-8 xs:min-h-[12rem]">
          {children}
        </div>
      </div>
    </div>
  )
}

export function Loading({children}: {children: React.ReactNode}) {
  return(
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 py-8">
      <BookOpenText size={48} color='var(--d-gr2)'/>
      <p className='text-[var(--d-gr1)]'>{children}</p>
    </div>
  )
}