import type { Meta, StoryObj } from '@storybook/nextjs';
import MetricsContainer from './userMetrics';

const meta = {
  title: 'ui/userMetrics',
  component: MetricsContainer,
} satisfies Meta<typeof MetricsContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const userMetrics: Story = {};
