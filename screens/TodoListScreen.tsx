import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import AddTodoModal from '../components/AddTodoModal';

interface Todo {
  id: string;
  title: string;
  imageUri?: string;
}

const TodoListScreen = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const addTodo = (title: string, imageUri?: string) => {
    const newTodo: Todo = { id: Date.now().toString(), title, imageUri };
    setTodos([...todos, newTodo]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.image} />}
            <Text style={styles.todoText}>{item.title}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <AddTodoModal visible={isModalVisible} onClose={() => setModalVisible(false)} onAddTodo={addTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  
    borderRadius: 12,
    marginVertical: 8,
    backgroundColor: '#fff', 
   

    shadowOpacity: 0.1,
    shadowRadius: 6,
 
  },
  todoText: {
    fontSize: 18,
    marginLeft: 15,
 

  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 8,
    borderWidth: 2,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: "17%",
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 50,
  },
  addButtonText: {
    fontSize: 28,
    color: '#fff',
  },
});

export default TodoListScreen;
