import { toast } from '@/components/ui/toast';
import { supabase } from '@/lib/supabase';
import { useEffect, useRef, useState } from 'react';

interface UseUploadImageProps {
  init?: string;
  action?: (url: string) => void;
}
export const useUploadImage = ({ init, action }: UseUploadImageProps) => {
  const [image, setImage] = useState<string>(init || '');
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log(image);
  }, [image]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const uuid = crypto.randomUUID();

    if (!file) return toast.close('No file selected');

    const { error } = await supabase.storage.from('images').upload(uuid, file);
    if (error) return toast.close('Error uploading image');

    const { data } = await supabase.storage.from('images').getPublicUrl(uuid);
    console.log(data);
    setImage(data.publicUrl);

    action?.(data.publicUrl);
  };
  const handleImageDelete = async () => {
    setImage('');
  };

  return { image, ref, handleImageDelete, handleImageUpload };
};
