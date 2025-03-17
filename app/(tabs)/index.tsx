import { useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";

const App = () => {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>('');

  const addItem = () => {
    if (newItem) {
      setItems(items => [...items, newItem]);
      setNewItem('');
    }
  }
  return (
    <View
      style={styles.container}
    >
      <TextInput
        style={styles.input}
        placeholder="Nuevo elemento"
        value={newItem}
        onChangeText={setNewItem}
      />
      <Button title="Agregar" onPress={addItem} />
      <FlatList
        data={items}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        keyExtractor={(item, idex) => idex.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
  },
})

export default App;
