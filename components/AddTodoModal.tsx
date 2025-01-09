import React, { useState } from 'react';
import { Modal, View, TextInput, StyleSheet, Button, TouchableOpacity, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface AddTodoModalProps {
  visible: boolean;
  onClose: () => void;
  onAddTodo: (title: string, imageUri?: string) => void;
}

const AddTodoModal = ({ visible, onClose, onAddTodo }: AddTodoModalProps) => {
  const [title, setTitle] = useState('');
  const [imageUri, setImageUri] = useState<string | undefined>();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.5 });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleAdd = () => {
    if (title) {
      onAddTodo(title, imageUri);
      setTitle('');
      setImageUri(undefined);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Přidat nový úkol</Text>
        
        {/* Textové pole pro zadání úkolu */}
        <TextInput
          style={styles.input}
          placeholder="Název úkolu"
          value={title}
          onChangeText={setTitle}
        />

        {/* Tlačítko pro přidání obrázku */}
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Text style={styles.imagePickerText}>Přidat obrázek</Text>
        </TouchableOpacity>

        {/* Zobrazení obrázku, pokud existuje */}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

        {/* Tlačítka pro přidání úkolu a zrušení */}
        <TouchableOpacity onPress={handleAdd} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Přidat úkol</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onClose} style={[styles.submitButton, { backgroundColor: 'red' }]}>
          <Text style={styles.submitButtonText}>Zrušit</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 20,
   
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
   
 
    width: '100%',

  },

  imagePicker: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  imagePickerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  image: {
    width: 120,
    height: 120,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 2,
   
  },

  submitButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: 'green',
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});


export default AddTodoModal;
