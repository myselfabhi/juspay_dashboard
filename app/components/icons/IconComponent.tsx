/**
 * IconComponent
 * Created by Abhinav Verma
 * Custom SVG icon component for the Juspay Dashboard
 * Handles professional icon management with precise styling
 */
import React from 'react';

interface IconProps {
  name: 'plus' | 'filter' | 'sort' | 'search';
  className?: string;
}

export const IconComponent: React.FC<IconProps> = ({ name, className = '' }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'plus':
        return <img src="/icons/add.svg" alt="Plus" className="w-[12.5px] h-[12.5px]" />;
      case 'filter':
        return <img src="/icons/filter.svg" alt="Filter" className="w-[12.5px] h-[12.5px]" />;
      case 'sort':
        return <img src="/icons/arrowdown.svg" alt="Sort" className="w-[12.5px] h-[12.5px]" />;
      case 'search':
        return <img src="/icons/bell.svg" alt="Search" className="w-[12.5px] h-[12.5px]" />;
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
