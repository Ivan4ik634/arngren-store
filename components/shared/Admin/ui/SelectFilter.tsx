'use client';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { FC } from 'react';

export interface SelectFilterOptionT {
  label: string;
  value: string;
}

interface Props {
  label: string;
  value?: string;
  options: SelectFilterOptionT[];
}

const SelectFilter: FC<Props> = (props) => {
  const selectedOption = props.options.find((option) => option.value === props.value);
  const triggerLabel = `${props.label}:${selectedOption?.label ?? 'All'}`;

  return (
    <Select value={props.value}>
      <SelectTrigger>
        <span className="text-muted-foreground">{triggerLabel}</span>
      </SelectTrigger>
      <SelectContent>
        {props.options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
