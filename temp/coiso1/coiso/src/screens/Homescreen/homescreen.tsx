import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, Alert, TextInput } from 'react-native';
import { Appbar, Button, Text, useTheme } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AntDesign, FontAwesome5, Feather } from '@expo/vector-icons';
import TaskRepository, {Tarefa} from '../../repository/TarefaRepository';

type RootStackParamList = {
  Home: undefined;
  AgendarTarefas: undefined;
  Read: undefined;
  Tarefas: undefined;
  Criar: undefined;
  Editar: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [titleToDelete, setTitleToDelete] = useState('');

  const deleteTaskByTitle = async () => {
    const taskRepository = new TaskRepository();
    try {
      await taskRepository.deleteTaskByTitle(titleToDelete);
      Alert.alert('Sucesso', 'Tarefa deletada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao deletar a tarefa.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#7d5b8c' }]}>
      <StatusBar barStyle="light-content" backgroundColor="#690f67" />
      <Appbar.Header style={{ backgroundColor: '#690f67' }}>
        <Appbar.Content title="To Do - Home" titleStyle={{ color: 'white' }} />
        <Appbar.Action icon={() => <AntDesign name="star" size={24} color="white" />} />
      </Appbar.Header>
      <View style={styles.content}>
        <Text style={[styles.greeting, { color: 'white' }]}>Olá!!</Text>
        <Text style={[styles.name, { color: 'white' }]}>Seja bem-vindo ao sistema de</Text>
        <Text style={[styles.name, { color: 'white' }]}>gestão de tarefa</Text>
        <Text style={[styles.selectionText, { color: 'white' }]}>Selecione uma das opções abaixo:</Text>
        <Button
          mode="contained"
          icon="calendar-plus"
          style={[styles.button, { backgroundColor: colors.primary }]}
          labelStyle={styles.buttonLabel}
          onPress={() => navigation.navigate('Criar')}
        >
          Criar tarefa
        </Button>
        <Button
          mode="contained"
          icon="magnify"
          style={[styles.button, { backgroundColor: colors.primary }]}
          labelStyle={styles.buttonLabel}
          onPress={() => navigation.navigate('Read')}
        >
          Visualizar tarefas
        </Button>
        <Button
          mode="contained"
          icon={() => <Feather name="edit-2" size={24} color="black" />}
          style={[styles.button, { backgroundColor: colors.primary }]}
          labelStyle={styles.buttonLabel}
          onPress={() => navigation.navigate('Editar')}
        >
          Editar Tarefa
        </Button>
        <TextInput
          style={styles.input}
          placeholder="Título da tarefa para deletar"
          value={titleToDelete}
          onChangeText={setTitleToDelete}
        />
        <Button
          mode="contained"
          icon="delete"
          style={[styles.button, { backgroundColor: colors.primary }]}
          labelStyle={styles.buttonLabel}
          onPress={deleteTaskByTitle}
        >
          Deletar Tarefa
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    justifyContent: 'center',
  },
  selectionText: {
    fontSize: 17,
    marginBottom: 20,
  },
  button: {
    width: '80%',
    marginVertical: 10,
  },
  buttonLabel: {
    fontSize: 16,
    color: 'white',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
    borderRadius: 4,
    backgroundColor: 'white',
  },
});

export default HomeScreen;
