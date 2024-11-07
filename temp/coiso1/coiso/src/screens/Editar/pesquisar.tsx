import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import TaskRepository, {Tarefa} from '../../repository/TarefaRepository';

type RootStackParamList = {
  Search: undefined;
  Editar: { task: Tarefa };
};

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;

type Props = {
  navigation: SearchScreenNavigationProp;
};

const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [task, setTask] = useState<Tarefa | null>(null);

  const searchTask = async () => {
    const taskRepository = new TaskRepository();
    const foundTask = await taskRepository.getTaskByTitle(title);
    if (foundTask) {
      setTask(foundTask);
      navigation.navigate('Editar', { task: foundTask });
    } else {
      Alert.alert('Tarefa não encontrada', 'Nenhuma tarefa com esse título foi encontrada.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título da Tarefa</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Buscar Tarefa" onPress={searchTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});

export default SearchScreen;
