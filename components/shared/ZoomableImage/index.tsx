'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type ZoomableImageProps = {
  src: string;
  alt?: string;
  className?: string;
};

export default function ZoomableImage({ src, alt = '', className = '' }: ZoomableImageProps) {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={() => setOpen(true)}
        className={`cursor-zoom-in ${className}`}
      />

      {open &&
        createPortal(
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 text-3xl text-white/70 hover:text-white">
              <X />
            </button>
            <img
              src={src}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-2xl border border-white/20 object-contain"
            />
          </div>,
          document.body,
        )}
    </>
  );
}
