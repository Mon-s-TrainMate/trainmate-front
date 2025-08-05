import type { Meta, StoryObj } from '@storybook/nextjs';
import { SelectBox } from './select';

const meta = {
  title: 'ui/SelectBox',
  component: SelectBox,
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof SelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: 'placeholder',
    items: [
      { label: '01', value: '01' },
      { label: '02', value: '02' },
      { label: '03', value: '03' },
    ],
  },
};
