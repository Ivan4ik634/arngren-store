import { supabase } from '@/lib/supabase/client';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface UseUploadImageProps {
  init?: string[];
  action?: (url: string[]) => void;
}
export const useUploadImages = ({ init, action }: UseUploadImageProps) => {
  const [images, setImages] = useState<string[]>(init || []);
  const ref = useRef<HTMLInputElement>(null);

  const handleImagesUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return toast.error('No file selected');
    if (images.length + files.length > 5) return toast.error('You can only upload 5 images');

    const uploaded: string[] = [];
    for (const file of files) {
      const uuid = crypto.randomUUID();
      const { error } = await supabase.storage.from('images').upload(uuid, file);
      if (error) return toast.error('Error uploading image');

      const { data } = await supabase.storage.from('images').getPublicUrl(uuid);
      uploaded.push(data.publicUrl);
    }

    const nextImages = [...images, ...uploaded];
    setImages(nextImages);
    action?.(nextImages);
  };
  const handleImagesDelete = async (url: string) => {
    const path = url.split('/').pop();
    if (path) {
      await supabase.storage.from('images').remove([path]);
    }
    setImages((prev) => prev.filter((image) => image !== url));
  };

  return { images, ref, handleImagesDelete, handleImagesUpload };
};
