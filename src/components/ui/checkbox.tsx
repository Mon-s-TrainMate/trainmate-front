'use client';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const checkboxVariants = cva(
  'peer shadow-xs size-4 shrink-0 rounded-[4px] border border-gray-2 transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-destructive/20 data-[state=checked]:border-primary dark:border-gray-2 dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
  {
    variants: {
      checkboxSize: {
        base: 'h-4.5 w-4.5 rounded-full',
      },
    },
    defaultVariants: {
      checkboxSize: 'base',
    },
  }
);

function Checkbox({
  className,
  checkboxSize,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ checkboxSize }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        forceMount
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-gray-2 data-[state=checked]:text-primary"
      >
        <CheckIcon className="size-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
