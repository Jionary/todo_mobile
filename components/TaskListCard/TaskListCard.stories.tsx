import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import TaskListCard from '@/components/TaskListCard/TaskListCard';

const meta = {
  title: 'Todo/TaskListCard',
  component: TaskListCard,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof TaskListCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: {
      id: '1',
      title: 'Computer Science',
      subtitle: 'Algorithms and data structures',
      percentage: 60,
      tags: ['school', 'important'],
    },
  },
};

export const Completed: Story = {
  args: {
    item: {
      id: '2',
      title: 'Math',
      subtitle: 'Calculus exercises',
      percentage: 100,
      tags: ['practice', 'exam'],
    },
  },
};
