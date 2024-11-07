import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { Avatar, Button, Card, Appbar } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TaskRepository, { Tarefa } from "../../repository/TarefaRepository";
import { FontAwesome5 } from '@expo/vector-icons';

type LeftContentProps = {
  size: number;
};

const LeftContent: React.FC<LeftContentProps> = (props) => <Avatar.Icon {...props} icon="folder" />;

type RootStackParamList = {
  Dashboard: undefined;
  TaskDetails: { taskTitle: string };
  AddTask: undefined;
  EditTask: { taskTitle: string };
  Home: undefined;
};

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const Dashboard: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const [tasks, setTasks] = useState<Tarefa[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<Tarefa[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const taskRepo = new TaskRepository();
      const fetchedTasks = await taskRepo.listTasks();
      setTasks(fetchedTasks);
      setFilteredTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    setFilteredTasks(
      tasks.filter(task =>
        task.titulo.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, tasks]);

  const handleCardPress = (taskTitle: string) => {
    navigation.navigate('TaskDetails', { taskTitle });
  };

  const handleEditTask = (taskTitle: string) => {
    navigation.navigate('EditTask', { taskTitle });
  };

  const handleDeleteTask = async (taskTitle: string) => {
    try {
      const taskRepo = new TaskRepository();
      await taskRepo.deleteTaskByTitle(taskTitle);
      const updatedTasks = tasks.filter(task => task.titulo !== taskTitle);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      Alert.alert('Sucesso', 'Tarefa excluída com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      Alert.alert('Erro', 'Erro ao excluir tarefa. Por favor, tente novamente.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#690f67" />
      <Appbar.Header style={{ backgroundColor: '#690f67' }}>
        <Appbar.Content title="To Do - Tarefas" titleStyle={{ color: 'white' }} />
        <Appbar.Action
          icon={() => <FontAwesome5 name="home" size={24} color="white" />}
          onPress={() => navigation.navigate('Home')}
        />
      </Appbar.Header>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar tarefa..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView style={styles.container}>
        {filteredTasks.map((task) => (
          <Card key={task.id} style={styles.cardBox} onPress={() => handleCardPress(task.titulo)}>
            <Card.Title
              title={task.materia}
              left={(props) => <LeftContent {...props} />}
            />
            <Card.Content>
              <Text style={styles.title}>{task.titulo}</Text>
              <Text style={styles.body}>{task.desc}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => handleEditTask(task.titulo)}>Editar</Button>
              <Button onPress={() => handleDeleteTask(task.titulo)}>Deletar</Button>
              <Button onPress={() => handleCardPress(task.titulo)}>Ver Mais</Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  cardBox: {
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  body: {
    fontSize: 14,
  }
});

export default Dashboard;
