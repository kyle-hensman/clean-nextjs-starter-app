import React from 'react';
import { twMerge } from 'tailwind-merge';

interface PageWrapperProps {
  className?: string; 
  contained?: boolean;
  centered?: boolean;
  padded?: boolean;
  children: React.ReactNode;
}

export default function PageWrapper({
  className,
  contained = false,
  centered = false,
  padded = true,
  children,
}: PageWrapperProps) {
  return (
    <div
      className={
        twMerge(
          'min-h-screen flex',
          centered && centered == true ? 'justify-center items-center' : '',
          contained && contained == true && 'container mx-auto',
          padded && padded == true && 'p-8 lg:p-12',
          className,
        )
      }
    >
      {children}
    </div>
  );
}
