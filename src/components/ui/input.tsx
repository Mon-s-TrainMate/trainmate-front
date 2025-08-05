import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const inputVariants = cva(
  'shadow-xs flex h-9 w-full min-w-0 rounded-[0.875rem] border border-input bg-transparent transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-gray-2 hover:bg-main-5 focus-visible:border-main-2 focus-visible:bg-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-gray-2 disabled:bg-gray-5 disabled:text-gray-2 aria-invalid:border-red-1 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
  {
    variants: {
      inputSize: {
        sm: 'h-12 rounded-sm px-4 text-lg',
        lg: 'h-17 rounded-xl px-4 text-lg',
      },
    },
    defaultVariants: {
      inputSize: 'lg',
    },
  }
);

function Input({
  className,
  inputSize,
  ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
  return (
    <input
      data-slot="input"
      className={inputVariants({ inputSize, className })}
      {...props}
    />
  );
}

export { Input, inputVariants };
