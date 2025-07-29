import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3.75 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      inputSize: {
        base: 'w-120 h-17 placeholder:text-muted-foreground placeholder:text-lg',
        search:
          'w-70 h-12 placeholder:text-muted-foreground placeholder:text-sm',
      },
    },
    defaultVariants: {
      inputSize: 'base',
    },
  }
);

function Input({
  className,
  type,
  inputSize,
  showSearchIcon = false,
  ...props
}: React.ComponentProps<'input'> &
  VariantProps<typeof inputVariants> & {
    showSearchIcon?: boolean;
  }) {
  if (showSearchIcon) {
    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type={type}
          data-slot="input"
          className={cn(
            inputVariants({ inputSize }),
            'pl-10',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            className
          )}
          {...props}
        />
      </div>
    );
  }

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        inputVariants({ inputSize }),
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  );
}

export { Input, inputVariants };
