import { useEffect, useState } from 'react';

/**
 * Синхронизирует локальное состояние (или внешний setter, например из Zustand store)
 * с данными запроса (useQuery). Позволяет локально мутировать данные (удаление,
 * обновление) без потери синхронизации при повторной загрузке данных.
 *
 * @param data данные из useQuery
 * @param setter опциональный внешний setter (например setReviews из store).
 *               Если передан, используется он, иначе — внутренний useState.
 * @returns [items, setItems] — локальное состояние и его setter
 */
export const useSyncQueryData = <T>(
  data: T[] | undefined | null,
  setter?: (value: T[]) => void,
) => {
  const [items, setItems] = useState<T[] | undefined | null>(data);

  useEffect(() => {
    if (setter) {
      if (data) setter(data);
    } else {
      setItems(data);
    }
  }, [data, setter]);

  return [items, setItems] as const;
};
