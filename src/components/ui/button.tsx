import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-button',
        destructive:
          'bg-destructive text-white focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background dark:bg-input/30 dark:border-input text-gray-5',
        secondary:
          'border border-primary bg-background dark:bg-input/30 text-primary',
        deactivation:
          'border bg-gray-2 text-white dark:bg-input/30 dark:border-input',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        plain:
          'border-none bg-background dark:bg-input/30 dark:border-input text-gray-8',
        plainLight: 'border-none bg-background text-gray-5',
        userChoice: 'text-primary font-bold shadow-tab-active',
        userChoiceDisabled: 'text-gray-5 font-bold shadow-tab-active',
        fullPlus: 'bg-primary text-white rounded-full',
        emptyPlus: 'bg-none text-gray-8 border border-gray-8 rounded-full',
      },
      size: {
        default: 'h-12.5 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-14.5 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        userChoice: 'h-13 rounded-[0.6rem] gap-2.5 px-3',
      },
      fontsize: {
        default: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fontsize: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  fontsize,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  const shouldShowPlusIcon = variant === 'fullPlus' || variant === 'emptyPlus';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className, fontsize }))}
      {...props}
    >
      {shouldShowPlusIcon ? <Plus className="size-5" /> : children}
    </Comp>
  );
}

export { Button, buttonVariants };
