import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EditTask: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Edit Task Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditTask;
