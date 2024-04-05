'use client';
 
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
 
export default function Pagination({ page: pageArg, hasNextPage, hasPreviousPage }: { page: number; hasNextPage: boolean; hasPreviousPage: boolean; }) {
  const pathname = usePathname();
  const { replace } = useRouter();

  const [page, setPage] = useState(pageArg);
 
  function handleClick(action: 'next' | 'previous') {
    let newPage;
    if (action === 'next') {
      newPage = page + 1;
    } else {
      newPage = page - 1;
    }
    setPage(newPage);
    const params = new URLSearchParams();
      params.set('page', newPage.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  const activeClasses = 'text-white hover:bg-indigo-700';
  const inactiveClasses = 'text-indigo-300';
 
  return (
    <div className="flex justify-between text-lg w-1/3 mx-auto bg-indigo-800 rounded-lg">
      <button
        className={`bg-indigo-600 py-2 px-4 rounded-l-lg ${hasPreviousPage ? activeClasses : inactiveClasses}`}
        onClick={() => {
          if (hasPreviousPage) handleClick('previous')
        }}
      >
        «
      </button>
      <span className='text-white py-2'>Page {page}</span>
      <button
        className={`bg-indigo-600  py-2 px-4 rounded-r-lg ${hasNextPage ? activeClasses : inactiveClasses}`}        
        onClick={() => {
          if (hasNextPage) handleClick('next')
        }}
      >
        »
      </button>
    </div>
  );
}