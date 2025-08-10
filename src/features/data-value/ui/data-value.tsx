import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const dataValueVariants = cva('flex', {
  variants: {
    size: {
      lg: 'flex-col',
      md: 'flex-col',
      sm: 'flex-row items-center gap-3',
      xs: 'flex-row items-baseline gap-1',
    },
  },
});

const labelVariants = cva('', {
  variants: {
    size: {
      lg: 'text-xl font-light text-gray-2',
      md: 'text-xl font-light text-gray-2',
      sm: '',
      xs: '',
    },
  },
});

const valueContainerVariants = cva('flex items-baseline', {
  variants: {
    size: {
      lg: 'gap-2',
      md: 'gap-2',
      sm: 'gap-2',
      xs: 'gap-1',
    },
  },
});

const valueVariants = cva('leading-none font-light', {
  variants: {
    size: {
      lg: 'text-[3.25rem] text-black',
      md: 'text-[2.5rem] text-black',
      sm: 'text-2xl text-main-2',
      xs: 'text-lg text-black',
    },
  },
});

const unitVariants = cva('font-light', {
  variants: {
    size: {
      lg: 'text-2xl text-black',
      md: 'text-xl text-black',
      sm: 'text-base text-black',
      xs: 'text-xs text-gray-1',
    },
  },
});

type BaseProps = {
  value: string | number;
  unit?: string;
  className?: string;
};

type DataValueProps =
  | (BaseProps & { size: 'lg' | 'md'; label: string; Icon?: never })
  | (BaseProps & { size: 'sm'; label?: never; Icon: React.FC })
  | (BaseProps & { size: 'xs'; label?: never; Icon?: never });

export function DataValue({
  value,
  unit,
  className,
  ...props
}: DataValueProps) {
  const formattedValue =
    typeof value === 'number' ? value.toLocaleString() : value;

  if (props.size === 'lg' || props.size === 'md') {
    return (
      <div className={cn(dataValueVariants({ size: props.size }), className)}>
        <div className={labelVariants({ size: props.size })}>{props.label}</div>
        <div className={valueContainerVariants({ size: props.size })}>
          <span className={valueVariants({ size: props.size })}>
            {formattedValue}
          </span>
          <span className={unitVariants({ size: props.size })}>{unit}</span>
        </div>
      </div>
    );
  }

  if (props.size === 'sm') {
    const IconComponent = props.Icon;
    return (
      <div className={cn(dataValueVariants({ size: props.size }), className)}>
        <div className="size-6 text-gray-2">
          <IconComponent />
        </div>
        <div className={valueContainerVariants({ size: props.size })}>
          <span className={valueVariants({ size: props.size })}>
            {formattedValue}
          </span>
          <span className={unitVariants({ size: props.size })}>{unit}</span>
        </div>
      </div>
    );
  }
  return (
    <div className={cn(dataValueVariants({ size: props.size }), className)}>
      <span className={valueVariants({ size: props.size })}>
        {formattedValue}
      </span>
      <span className={unitVariants({ size: props.size })}>{unit}</span>
    </div>
  );
}

export type { DataValueProps };
