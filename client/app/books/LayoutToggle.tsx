import React from 'react';

type Layout = 'list' | 'grid';

interface LayoutToggleProps {
  value: Layout;
  onChange: (layout: Layout) => void;
}

const ListIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3" y="5" width="18" height="2" rx="1" fill={active ? '#7c3aed' : '#9ca3af'} />
    <rect x="3" y="11" width="18" height="2" rx="1" fill={active ? '#7c3aed' : '#9ca3af'} />
    <rect x="3" y="17" width="18" height="2" rx="1" fill={active ? '#7c3aed' : '#9ca3af'} />
  </svg>
);

const GridIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3" y="3" width="8" height="8" rx="2" fill={active ? '#7c3aed' : '#9ca3af'} />
    <rect x="13" y="3" width="8" height="8" rx="2" fill={active ? '#7c3aed' : '#9ca3af'} />
    <rect x="3" y="13" width="8" height="8" rx="2" fill={active ? '#7c3aed' : '#9ca3af'} />
    <rect x="13" y="13" width="8" height="8" rx="2" fill={active ? '#7c3aed' : '#9ca3af'} />
  </svg>
);

const LayoutToggle: React.FC<LayoutToggleProps> = ({ value, onChange }) => {
  const isList = value === 'list';
  const isGrid = value === 'grid';
  
  return (
    <div className="layout-toggle flex items-center bg-gray-100 rounded-lg p-1" role="group" aria-label="Toggle layout">
      <button
        type="button"
        aria-pressed={isList}
        aria-label="List layout"
        title="List view"
        className={`layout-toggle__btn flex items-center justify-center w-10 h-10 rounded-md transition-all duration-300 ${
          isList 
            ? 'bg-white shadow-sm text-primary border border-gray-200' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => onChange('list')}
      >
        <ListIcon active={isList} />
      </button>
      <button
        type="button"
        aria-pressed={isGrid}
        aria-label="Grid layout"
        title="Grid view"
        className={`layout-toggle__btn flex items-center justify-center w-10 h-10 rounded-md transition-all duration-300 ${
          isGrid 
            ? 'bg-white shadow-sm text-primary border border-gray-200' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => onChange('grid')}
      >
        <GridIcon active={isGrid} />
      </button>
    </div>
  );
};

export default LayoutToggle;
