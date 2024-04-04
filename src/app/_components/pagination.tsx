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

  const activeClasses = 'text-black';
  const inactiveClasses = 'text-gray-500';
 
  return (
    <div className="flex justify-between w-1/2 mx-auto">
      <button
        className={`text-sm ${hasPreviousPage ? activeClasses : inactiveClasses}`}
        onClick={() => handleClick('previous')}
      >
        Previous
      </button>
      <span className='text-lg'>··· Page {page} ···</span>
      <button
        className={`text-sm ${hasNextPage ? activeClasses : inactiveClasses}`}        
        onClick={() => handleClick('next')}
      >
        Next
      </button>
    </div>
  );
}