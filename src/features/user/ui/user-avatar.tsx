import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cva, VariantProps } from 'class-variance-authority';

const styles = cva('', {
  variants: {
    size: {
      xs: 'size-8 rounded-sm',
      sm: 'size-9 rounded-sm md:size-12 md:rounded-lg',
      md: 'size-12 rounded-lg md:size-14 md:rounded-xl',
      lg: 'size-15 rounded-xl',
      xl: 'size-20 rounded-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
export type UserAvatarProps = {
  src?: string;
  className?: string;
} & VariantProps<typeof styles>;
export function UserAvatar({ src, size, className }: UserAvatarProps) {
  return (
    <Avatar className={styles({ size, className })}>
      <AvatarImage src={src} />
      <AvatarFallback />
    </Avatar>
  );
}
