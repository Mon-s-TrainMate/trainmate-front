import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 w-full whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-r∂ing/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white border border-transparent hover:bg-main-1 hover:border-main-2 disabled:bg-gray-3',
        secondary:
          'bg-main-4 text-white border border-transparent hover:bg-main-3 hover:border-main-4 disabled:bg-gray-3',
        tertiary:
          'bg-black text-white border border-transparent hover:bg-gray-4 hover:border-black disabled:bg-gray-3',
        text: 'bg-none text-black hover:bg-primary-foreground hover:text-primary disabled:text-gray-3',
      },
      size: {
        sm: 'h-10.5 px-3.5 rounded-sm font-medium',
        md: 'h-11.5 px-5 rounded-md font-semibold',
        lg: 'h-11.5 px-6 rounded-md font-bold',
        icon: 'size-6 p-0 rounded-sm',
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
