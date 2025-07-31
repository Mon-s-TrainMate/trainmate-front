import type { Meta, StoryObj } from '@storybook/nextjs';
import UserMetrics from './userMetrics';

const meta = {
  title: 'ui/userMetrics',
  component: UserMetrics,
} satisfies Meta<typeof UserMetrics>;

export default meta;
type Story = StoryObj<typeof meta>;

export const userMetrics: Story = {};
