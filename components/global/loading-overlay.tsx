'use client';

import { useEffect } from 'react';

type PropTypes = {
  show: boolean
};

const LoadingOverlay = ({ show }: PropTypes) =>  {
  useEffect(() => {
    if (!show) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white" aria-hidden="true">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
    </div>
  );
}

export default LoadingOverlay;