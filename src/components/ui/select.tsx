'use client';
import { cva, type VariantProps } from 'class-variance-authority';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

const selectTriggerVariants = cva(
  "shadow-xs flex w-fit items-center justify-start gap-2 rounded-md border border-gray-1 bg-transparent px-3 py-2 text-sm whitespace-nowrap text-black transition-[color,box-shadow] outline-none hover:bg-main-5 disabled:cursor-not-allowed disabled:bg-gray-5 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 data-[state=open]:border-main-2 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
  {
    variants: {
      size: {
        normal: 'h-13',
      },
    },
    defaultVariants: {
      size: 'normal',
    },
  }
);

const selectItemVariants = cva(
  '[&_svg:not([class*="text-"])] text-base:text-muted-foreground relative flex h-8.75 w-full cursor-default items-center gap-2 rounded-sm pr-8 pl-2 text-sm outline-hidden select-none focus:bg-main-5 focus:text-main-2 disabled:text-gray-3 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=checked]:text-main-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2'
);

const selectContentVariants = cva(
  'shadow-md relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95'
);

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = 'normal',
  children,
  open,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> &
  VariantProps<typeof selectTriggerVariants> & { open?: boolean }) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(selectTriggerVariants({ size }), className)}
      {...props}
    >
      <SelectPrimitive.Icon asChild>
        {open ? (
          <ChevronUpIcon className="size-4 text-black opacity-50" />
        ) : (
          <ChevronDownIcon className="size-4 text-black opacity-50" />
        )}
      </SelectPrimitive.Icon>
      {children}
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> &
  VariantProps<typeof selectContentVariants>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          selectContentVariants(),
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'flex h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1 flex-col gap-1'
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('px-2 py-1.5 text-xs text-muted-foreground', className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  align = 'left',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item> &
  VariantProps<typeof selectItemVariants> & { align?: 'left' | 'center' }) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        selectItemVariants(),
        align === 'center'
          ? 'justify-center px-0 text-center'
          : 'justify-start text-left',
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('pointer-events-none -mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

type SelectBoxProps = {
  items: { label: string; value: string }[];
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  unit?: string;
  align?: 'left' | 'center';
};

function SelectBox({
  items,
  placeholder,
  value,
  unit = 'unit',
  onValueChange,
  disabled = false,
  align = 'left',
}: SelectBoxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      onOpenChange={setOpen}
      open={open}
    >
      <SelectTrigger open={open}>
        <div className="flex-1 text-center">
          <SelectValue placeholder={placeholder} />
        </div>
        <p className="ml-auto text-base font-normal text-black">{unit}</p>
      </SelectTrigger>
      <SelectContent className="border-shadow-level-1-lighter rounded-xl border">
        {items.map(({ label, value }) => (
          <SelectItem key={value} value={value} align={align}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectBox,
};
