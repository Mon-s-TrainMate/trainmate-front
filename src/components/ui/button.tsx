import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          'border border-transparent bg-primary text-white hover:border-main-2 hover:bg-main-1 disabled:bg-gray-3',
        secondary:
          'border border-transparent bg-main-4 text-white hover:border-main-4 hover:bg-main-3 disabled:bg-gray-3',
        tertiary:
          'border border-transparent bg-black text-white hover:border-black hover:bg-gray-1 disabled:bg-gray-3',
        text: 'bg-none text-black hover:bg-primary-foreground hover:text-primary disabled:text-gray-3',
        icon: 'bg-none text-black hover:text-primary active:text-primary disabled:text-gray-2',
      },
      size: {
        sm: 'h-10.5 rounded-sm px-3.5 font-medium',
        md: 'h-11.5 rounded-md px-5 font-semibold',
        lg: 'h-11.5 rounded-md px-6 font-bold',
        icon: "size-6 rounded-sm p-0 [&_svg:not([class*='size-'])]:size-5",
        circle: 'size-12 rounded-full p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
