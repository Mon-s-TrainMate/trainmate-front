import type { Meta, StoryObj } from '@storybook/nextjs';
import { Label } from './label';

const meta = {
  title: 'ui/label',
  component: Label,
  argTypes: {
    labelSize: {
      control: { type: 'select' },
      options: ['sm', 'xs', 'base', 'xl', 'xxl'],
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const label: Story = {
  args: {
    children: 'label',
    labelSize: 'xxl',
  },
};
