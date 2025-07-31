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
        'plain',
        'deactivation',
        'secondary',
        'plainLight',
        'userChoice',
        'userChoiceDisabled',
        'fullPlus',
        'emptyPlus',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'lg', 'icon', 'userChoice'],
    },
    fontsize: {
      control: 'select',
      options: ['lg'],
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

export const plain: Story = {
  args: {
    variant: 'plain',
    children: '회원가입',
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

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '나의 데이터 등록하기',
    asChild: false,
    size: 'lg',
  },
};

export const plainLight: Story = {
  args: {
    variant: 'plainLight',
    children: '회원가입',
    asChild: false,
  },
};

export const UserChoice: Story = {
  args: {
    variant: 'userChoice',
    children: '개인회원',
    asChild: false,
    size: 'userChoice',
    fontsize: 'lg',
  },
};

export const userChoiceDisabled: Story = {
  args: {
    variant: 'userChoiceDisabled',
    children: '트레이너',
    asChild: false,
    size: 'userChoice',
    fontsize: 'lg',
  },
};

export const FullPlus: Story = {
  args: {
    variant: 'fullPlus',
    children: '+',
    asChild: false,
    size: 'icon',
  },
};

export const EmptyPlus: Story = {
  args: {
    variant: 'emptyPlus',
    children: '+',
    asChild: false,
    size: 'icon',
  },
};
