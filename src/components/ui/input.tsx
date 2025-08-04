import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary placeholder:px-1 selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3.75 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      type: {
        normal:
          'hover:bg-primary-foreground focus:border-primary disabled:gray-0\.5',
        error: 'border-red-1',
      },
      inputSize: {
        normal: 'w-full h-17 text-lg font-normal',
        small: 'w-full h-12 text-sm font-normal',
      },
    },
    defaultVariants: {
      type: 'normal',
      inputSize: 'normal',
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
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type={type}
          data-slot="input"
          className={cn(
            inputVariants({ type, inputSize }),
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
        inputVariants({ type, inputSize }),
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  );
}

export { Input, inputVariants };
