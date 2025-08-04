import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-[0.875rem] border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-5 disabled:border-gray-2 disabled:text-gray-2 hover:bg-main-5 hover:border-gray-2 focus-visible:bg-white focus-visible:border-main-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      inputSize: {
        sm: 'h-12 px-4 text-lg rounded-sm',
        lg: 'h-17 px-4 text-lg rounded-xl',
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
