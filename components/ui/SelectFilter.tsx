'use client';

import { FC, useState } from 'react';
import { Button } from './button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface SelectFilterOptionT {
  label: string;
  value: string;
}

interface Props {
  label: string;
  value?: string;
  options: SelectFilterOptionT[];
  search?: boolean;
  onChange?: (value: string | null) => void;
}

const SelectFilter: FC<Props> = (props) => {
  const { search = false } = props;

  const [open, setOpen] = useState(false);

  const selectedOption = props.options.find((option) => option.value === props.value);
  const triggerLabel = `${props.label}:${selectedOption?.label ?? 'All'}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button variant="outline" role="combobox" className="w-full min-w-0 justify-between text-muted-foreground">
          {triggerLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          {search && <CommandInput placeholder="Search..." />}
          <CommandList>
            <CommandEmpty>No results</CommandEmpty>
            {props.options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.label}
                onSelect={() => {
                  if (props.onChange) props.onChange(option.value);
                  setOpen(false);
                }}>
                {option.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectFilter;
