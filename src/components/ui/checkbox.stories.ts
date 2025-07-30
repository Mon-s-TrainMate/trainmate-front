import type { Meta, StoryObj } from '@storybook/nextjs';
import { Checkbox } from './checkbox';

const meta = {
  title: 'ui/checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const checkbox: Story = {};
