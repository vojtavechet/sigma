import React from 'react';
import { View, Text } from 'react-native';
import TodoListScreen from '../../screens/TodoListScreen';

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TodoListScreen />
    </View>
  );
}
