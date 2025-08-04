import type { Meta, StoryObj } from '@storybook/nextjs';
import { Input } from './input';

const meta = {
  title: 'ui/Input',
  component: Input,
  argTypes: {
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['normal', 'error'],
    },
    inputSize: {
      control: 'select',
      options: ['normal', 'small'],
    },
    showSearchIcon: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShowInput: Story = {
  args: {
    placeholder: 'Placeholder',
    type: 'normal',
  },
};
