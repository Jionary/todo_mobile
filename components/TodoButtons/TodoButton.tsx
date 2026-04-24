import React from 'react';
import { Pressable } from 'react-native';
import { Text } from '@/components/ui/text';

type TodoButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
};

const TodoButton: React.FC<TodoButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
}) => {
  const buttonClassName =
    variant === 'primary'
      ? 'bg-primary-500 rounded-xl px-4 py-3 items-center'
      : 'bg-background-100 border border-outline-300 rounded-xl px-4 py-3 items-center';

  const textClassName =
    variant === 'primary'
      ? 'text-white font-semibold'
      : 'text-typography-900 font-semibold';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`${buttonClassName} ${disabled ? 'opacity-50' : ''}`}
    >
      <Text className={textClassName}>{label}</Text>
    </Pressable>
  );
};

export default TodoButton;
