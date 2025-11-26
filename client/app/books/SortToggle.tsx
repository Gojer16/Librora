import React, { useEffect, useRef, useState } from 'react';

type SortKey = 'title' | 'publicationYear' | 'rating';
type SortOrder = 'asc' | 'desc';

interface SortToggleProps {
  onChange: (sort: { sort: SortKey; order: SortOrder }) => void;
}

const SortToggle: React.FC<SortToggleProps> = ({ onChange }) => {
  const [sort, setSort] = useState<SortKey>('title');
  const [order, setOrder] = useState<SortOrder>('asc');

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onChangeRef.current({ sort, order });
  }, [sort, order]);

  return (
    <div className="sort-toggle flex flex-wrap gap-2">
      <div className="relative">
        <select
          value={sort}
          onChange={(e) => {
            const next = e.target.value as SortKey;
            setSort(next);
            if (next === 'title') {
              setOrder('asc');
            } else {
              setOrder('desc');
            }
          }}
          className="sort-toggle__select appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
        >
          <option value="title">A–Z</option>
          <option value="publicationYear">Newest</option>
          <option value="rating">Rating</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      <button 
        type="button" 
        onClick={() => setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))} 
        className="sort-toggle__order flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
      >
        {order === 'asc' ? (
          <>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
            </svg>
            Asc
          </>
        ) : (
          <>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
            </svg>
            Desc
          </>
        )}
      </button>
    </div>
  );
};

export default SortToggle;
