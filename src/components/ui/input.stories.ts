import type { Meta, StoryObj } from '@storybook/nextjs';
import { Input } from './input';

const meta = {
  title: 'ui/Input',
  component: Input,
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    inputSize: {
      control: 'select',
      options: ['lg', 'sm'],
    },
    disabled: {
      control: 'boolean',
    },
    'aria-invalid': {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyInput: Story = {
  args: {
    placeholder: 'Placeholder',
  },
};
export const FilledInput: Story = {
  args: {
    value: '강장공장',
  },
};
export const EmptySmInput: Story = {
  args: {
    placeholder: 'Placeholder',
    inputSize: 'sm',
  },
};
export const FilledSmInput: Story = {
  args: {
    value: '강장공장',
    inputSize: 'sm',
  },
};
