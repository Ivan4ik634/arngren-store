import { useState } from 'react';

export const useCheckboxes = <T>(items: T[], getId: (item: T) => string) => {
  const [idsChecked, setIdsChecked] = useState<string[]>([]);

  const allChecked = items.length > 0 && idsChecked.length === items.length;

  const handleCheckAll = () => {
    setIdsChecked(allChecked ? [] : items.map(getId));
  };

  const handleCheck = (id: string) => {
    setIdsChecked((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return {
    idsChecked,
    allChecked,
    handleCheckAll,
    handleCheck,
  };
};
