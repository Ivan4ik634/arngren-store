'use client';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { SelectRootChangeEventDetails } from '@base-ui/react';
import { FC } from 'react';

export interface SelectFilterOptionT {
  label: string;
  value: string;
}

interface Props {
  label: string;
  value?: string;
  options: SelectFilterOptionT[];
  onChange?:
    | ((value: string | null, eventDetails: SelectRootChangeEventDetails) => void)
    | undefined;
}

const SelectFilter: FC<Props> = (props) => {
  const selectedOption = props.options.find((option) => option.value === props.value);
  const triggerLabel = `${props.label}:${selectedOption?.label ?? 'All'}`;

  return (
    <Select value={props.value} onValueChange={props.onChange}>
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
