import type { Meta, StoryObj } from '@storybook/nextjs';
import { Input } from './input';

const meta = {
  title: 'ui/input',
  component: Input,
  argTypes: {
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password'],
    },
    inputSize: {
      control: 'select',
      options: ['base', 'search'],
    },
    showSearchIcon: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Email: Story = {
  args: {
    placeholder: '이메일 주소를 입력해주세요.',
    type: 'email',
  },
};

export const Password: Story = {
  args: {
    placeholder: '비밀번호를 입력해주세요.',
    type: 'password',
  },
};

export const PasswordCheck: Story = {
  args: {
    placeholder: '비밀번호를 입력해주세요.',
    type: 'password',
  },
};

export const Username: Story = {
  args: {
    placeholder: '이름을 입력해주세요.',
    type: 'text',
  },
};

export const ExerciseSearch: Story = {
  args: {
    placeholder: '운동명을 검색해보세요.',
    type: 'text',
    inputSize: 'search',
    showSearchIcon: true,
  },
};

export const UserSearch: Story = {
  args: {
    placeholder: '회원 이름을 검색해보세요.',
    type: 'text',
    inputSize: 'search',
    showSearchIcon: true,
  },
};
