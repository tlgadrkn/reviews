'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useRouter } from 'next/navigation';

type ComboboxItem = Record<'value' | 'label', string>;

type ComboboxItems = ComboboxItem[];

type ComboboxProps = {
  items?: ComboboxItems;
};

export function Combobox({ items }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const filteredItems =
    items?.filter((item) => item.value.toLowerCase().includes(value.toLowerCase())) || [];

  const { push } = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? filteredItems.find((framework) => framework.value === value)?.label
            : 'Select framework...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search items..." />
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandGroup>
            {filteredItems?.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                  push(`/reviews/${currentValue}`);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === item.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}