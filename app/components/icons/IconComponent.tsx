/**
 * IconComponent
 * Created by Abhinav Verma
 * Custom SVG icon component for the Juspay Dashboard
 * Handles professional icon management with precise styling
 */
import React from 'react';

// Import SVG files from assets folder
import PlusIcon from '../../assets/icons/plus-icon.svg';
import FilterIcon from '../../assets/icons/filter-icon.svg';
import SortIcon from '../../assets/icons/sort-icon.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';

interface IconProps {
  name: 'plus' | 'filter' | 'sort' | 'search';
  className?: string;
}

export const IconComponent: React.FC<IconProps> = ({ name, className = '' }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'plus':
        return <img src={PlusIcon} alt="Plus" className="w-[12.5px] h-[12.5px]" />;
      case 'filter':
        return <img src={FilterIcon} alt="Filter" className="w-[12.5px] h-[12.5px]" />;
      case 'sort':
        return <img src={SortIcon} alt="Sort" className="w-[12.5px] h-[12.5px]" />;
      case 'search':
        return <img src={SearchIcon} alt="Search" className="w-[12.5px] h-[12.5px]" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`${className} relative`}
      style={{
        width: '12.5px',
        height: '12.5px',
        top: '3.75px',
        left: '3.75px',
        opacity: 1
      }}
    >
      {getIcon(name)}
    </div>
  );
};
