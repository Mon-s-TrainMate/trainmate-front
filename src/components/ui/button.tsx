import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-button-primary-hover disable:bg-gray-2',
        secondary:
          'bg-primary-4 text-white hover:bg-primary-3 disable:bg-gray-2',
        tertiary: 'bg-gray-8 text-white hover:bg-gray-6 disable:bg-gray-2',
        text: 'bg-none text-gray-8 hover:bg-primary-foreground hover:text-primary disable:text-gary-2',
      },
      size: {
        small: 'w-17.5 h-10.5 font-medium',
        medium: 'w-20.75 h-11.5 font-semibold',
        large: 'w-24.5 h-11.5 font-bold',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
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
