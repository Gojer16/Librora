import React, { useEffect, useMemo, useRef, useState } from 'react';
import { genreColors } from '../constants/genreColors';

interface FiltersProps {
  onChange: (filters: { genre?: string; publicationYear?: string | number }) => void;
}

const Filters: React.FC<FiltersProps> = ({ onChange }) => {
  const [genre, setGenre] = useState<string>('');
  const [year, setYear] = useState<string>('');

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const debounce = useMemo(() => (fn: () => void, delay = 300) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(fn, delay);
  }, []);

  useEffect(() => {
    debounce(() => onChangeRef.current({
      genre: genre || undefined,
      publicationYear: year || undefined,
    }), 300);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [genre, year, debounce]);

  const years = useMemo(() => {
    const current = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => String(current - i));
  }, []);

  return (
    <div className="filters flex flex-wrap gap-2">
      <div className="relative">
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="filters__select appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
        >
          <option value="">All Genres</option>
          {Object.keys(genreColors).map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <div className="relative">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="filters__select appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Filters;
