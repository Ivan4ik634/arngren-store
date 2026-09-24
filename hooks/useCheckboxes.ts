import { useEffect, useState } from 'react';

export const useCheckboxes = <T>(items: T[], getId: (item: T) => string) => {
  const [idsChecked, setIdsChecked] = useState<string[]>([]);

  const allChecked = items.length > 0 && idsChecked.length === items.length;

  // Сбрасываем выбор при изменении данных (например, при смене фильтров),
  // чтобы idsChecked не содержал id, которых больше нет в списке
  useEffect(() => {
    setIdsChecked((prev) => {
      const validIds = new Set(items.map(getId));
      const filtered = prev.filter((id) => validIds.has(id));
      return filtered.length === prev.length ? prev : filtered;
    });
  }, [items, getId]);

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
    setIdsChecked,
    handleCheckAll,
    handleCheck,
  };
};
