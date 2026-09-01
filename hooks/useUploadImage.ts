import { toast } from '@/components/ui/toast';
import { supabase } from '@/lib/supabase';
import { useRef, useState } from 'react';

export const useUploadImage = () => {
  const [image, setImage] = useState<string>('');
  const ref = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const uuid = crypto.randomUUID();
    if (file) {
      const { error } = await supabase.storage.from('images').upload(uuid, file);
      if (!error) return toast.close('Error uploading image');

      const { data } = supabase.storage.from('images').getPublicUrl(uuid);
      setImage(data.publicUrl);
    }
  };
  const handleImageDelete = async () => {
    setImage('');
  };

  return { image, ref, handleImageDelete, handleImageUpload };
};
