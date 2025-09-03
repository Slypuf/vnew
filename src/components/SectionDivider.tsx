import React from 'react';
import { useAnimation } from '../hooks/useAnimation';

const SectionDivider: React.FC = () => {
  const { elementRef, isVisible } = useAnimation({ delay: 100 });

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`relative w-full flex items-center justify-center py-6 transition-all duration-700 ${
        isVisible ? 'animate-slide-up-bottom-small' : 'animate-initial'
      }`}
    >
      {/* Core divider line */}
      <div className="relative w-80 sm:w-48 h-1 bg-gradient-to-r from-transparent via-[#67E8F9]/80 to-transparent rounded-full" />

      

      {/* Subtle inner line for definition */}
      <div className="absolute w-30 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#67E8F9]/30 to-transparent" />
    </div>
  );
};

export default SectionDivider;
