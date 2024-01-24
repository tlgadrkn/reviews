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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce, useIsClient } from '@/app/hooks';

type ComboboxItem = Record<'value' | 'label', string>;
type ComboboxItems = ComboboxItem[];
type ComboboxProps = {
  items?: ComboboxItems;
};

export function Combobox() {
  const isClient = useIsClient();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [items, setItems] = React.useState<ComboboxItem[]>([]);
  const debouncedValue = useDebounce(value, 400);
  const { push, replace } = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );
  React.useEffect(() => {
    // using abort controller to cancel fetch request is helpful when user types fast and we want to avoid unnecessary requests to the server. Users can have slow Internet meaning we can receive responses for previous requests after we already received response for the latest request. Also, it's a good practice to cancel fetch requests when component unmounts

    if (debouncedValue.length > 1) {
      const controller = new AbortController();
      (async () => {
        const results = await fetch(
          '/api/search?query=' + encodeURIComponent(debouncedValue),
          {
            signal: controller.signal,
          },
        );
        const json = await results.json();
        setItems(json);
      })();

      return () => {
        controller.abort();
      };
    } else {
      setItems([]);
    }
  }, [debouncedValue]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setValue(value);
    // createQueryString('query', value);
  };

  if (!isClient) {
    return null;
  }

  console.log('ITEMS CLIENT SIDE', items);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value?.title : 'Select review...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="h-44 scroll-m-5 overflow-auto">
          <CommandInput onChangeCapture={handleChange} placeholder="Search items..." />
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandGroup className="scroll-m-5 overflow-auto">
            {items?.map((item) => (
              <CommandItem
                key={item.slug}
                value={item.slug}
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
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
