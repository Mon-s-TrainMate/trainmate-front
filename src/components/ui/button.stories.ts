import type { Meta, StoryObj } from '@storybook/nextjs';

import { fn } from 'storybook/test';

import { Button } from './button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'ui/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'outline',
        'deactivation',
        'secondaryLink',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'lg', 'icon'],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'default',
    children: 'content',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'outline',
    children: 'asdasd',
    asChild: false,
  },
};

export const Deactivation: Story = {
  args: {
    variant: 'deactivation',
    children: '가입하기',
    asChild: false,
    size: 'lg',
  },
};

export const Deactivation3: Story = {
  args: {
    variant: 'secondaryLink',
    children: '나의 데이터 등록하기',
    asChild: false,
    size: 'lg',
  },
};
