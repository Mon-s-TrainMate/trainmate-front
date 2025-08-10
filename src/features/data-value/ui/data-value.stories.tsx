import type { Meta, StoryObj } from '@storybook/nextjs';
import { WeightIcon } from 'lucide-react';
import { DataValue } from './data-value';

const meta = {
  title: 'ui/DataValue',
  component: DataValue,
  argTypes: {
    value: {
      control: 'number',
    },
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm', 'xs'],
    },
  },
} satisfies Meta<typeof DataValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'large',
    unit: 'kg',
    value: 5173,
  },
};
export const Medium: Story = {
  args: {
    size: 'md',
    label: 'medium',
    unit: 'kg',
    value: 5173,
  },
};
export const Small: Story = {
  args: {
    size: 'sm',
    Icon: WeightIcon,
    unit: 'kg',
    value: 5173,
  },
};
export const Light: Story = {
  args: {
    size: 'xs',
    unit: 'kg',
    value: 5173,
  },
};
