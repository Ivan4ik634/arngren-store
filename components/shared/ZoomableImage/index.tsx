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
      <button
        type="button"
        aria-label={`Zoom image${alt ? `: ${alt}` : ''}`}
        onClick={() => setOpen(true)}
        className="block w-full cursor-zoom-in text-left">
        <img src={src} alt={alt} className={className} />
      </button>

      {open &&
        createPortal(
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-2 backdrop-blur-sm sm:p-4">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white sm:right-4 sm:top-4">
              <X className="size-6" />
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
