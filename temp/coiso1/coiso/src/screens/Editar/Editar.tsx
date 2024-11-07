import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import TaskRepository, {Tarefa} from '../../repository/TarefaRepository';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Read: undefined;
  Criar: undefined;
  Editar: { taskId: number; taskTitle: string };
  Pesquisar: undefined;
};

type EditTaskProps = StackScreenProps<RootStackParamList, 'Editar'>;

const UpdateTask: React.FC<EditTaskProps> = ({ route, navigation }) => {
  const { taskId, taskTitle } = route.params;
  const [task, setTask] = useState<Tarefa | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      const taskRepo = new TaskRepository();
      const fetchedTask = await taskRepo.getTaskById(taskId);
      setTask(fetchedTask);
      setLoading(false);
    };
    fetchTask();
  }, [taskId]);

  const handleUpdate = async () => {
    if (task) {
      const taskRepo = new TaskRepository();
      await taskRepo.updateTask(task);
      navigation.goBack();
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!task) {
    return <Text>Task not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Edit Task</Text>
      <TextInput
        value={task.titulo}
        onChangeText={(text) => setTask({ ...task, titulo: text })}
        placeholder="Title"
        style={styles.input}
      />
      <TextInput
        value={task.desc}
        onChangeText={(text) => setTask({ ...task, desc: text })}
        placeholder="Description"
        style={styles.input}
      />
      <Button title="Update Task" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
  },
});

export default UpdateTask;
