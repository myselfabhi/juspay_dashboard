/**
 * IconComponent
 * Created by Abhinav Verma
 * Custom SVG icon component for the Juspay Dashboard
 * Handles professional icon management with precise styling
 */
import React from 'react';
import Image from 'next/image';

interface IconProps {
  name: 'plus' | 'filter' | 'sort' | 'search';
  className?: string;
}

export const IconComponent: React.FC<IconProps> = ({ name, className = '' }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'plus':
        return <Image src="/icons/add.svg" alt="Plus" width={12} height={12} className="w-[12.5px] h-[12.5px]" />;
      case 'filter':
        return <Image src="/icons/filter.svg" alt="Filter" width={12} height={12} className="w-[12.5px] h-[12.5px]" />;
      case 'sort':
        return <Image src="/icons/arrowdown.svg" alt="Sort" width={12} height={12} className="w-[12.5px] h-[12.5px]" />;
      case 'search':
        return <Image src="/icons/bell.svg" alt="Search" width={12} height={12} className="w-[12.5px] h-[12.5px]" />;
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
