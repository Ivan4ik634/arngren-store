import { toast } from '@/components/ui/toast';
import { supabase } from '@/lib/supabase/client';
import { useRef, useState } from 'react';

interface UseUploadImageProps {
  init?: string[];
  action?: (url: string[]) => void;
}
export const useUploadImages = ({ init, action }: UseUploadImageProps) => {
  const [images, setImages] = useState<string[]>(init || []);
  const ref = useRef<HTMLInputElement>(null);

  const handleImagesUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return toast.close('No file selected');
    if (files.length === 5) return toast.close('You can only upload 5 images');
    for (const file of files) {
      const uuid = crypto.randomUUID();
      const { error } = await supabase.storage.from('images').upload(uuid, file);
      if (error) return toast.close('Error uploading image');

      const { data } = await supabase.storage.from('images').getPublicUrl(uuid);
      console.log(data);
      setImages((prev) => [...prev, data.publicUrl]);
    }
    action?.(images);
  };
  const handleImagesDelete = async (url: string) => {
    setImages((prev) => prev.filter((image) => image !== url));
  };

  return { images, ref, handleImagesDelete, handleImagesUpload };
};
