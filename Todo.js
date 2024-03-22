import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Modal,
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { useTodoApi } from "./useTodo";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { data, refetch } = useTodoApi();

  const closeModal = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setTodos(data);
      }, 500);
    }
  }, [data]);

//   const fetchTodos = async () => {
//     try {
//       const response = await axios.get("http://192.168.1.13:3000/todos");
//       setTodos(response.data);
//     } catch (error) {
//       console.error("Error fetching todos:", error);
//     }
//   };

  const addTodo = async () => {
    if (title.trim() !== "" && description.trim() !== "") {
      const newTodo = { id: todos.length + 1, title, description };
      try {
        await axios.post("http://192.168.1.13:3000/todos", newTodo);
        setTodos([...todos, newTodo]);
        setTitle("");
        setDescription("");
        setModalVisible(false);
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const renderTodoItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <>
      <View
        style={{
          padding: 15,
          backgroundColor: "#fff",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "900",
            marginTop: 10,
            alignSelf: "center",
          }}
        >
          TODO LIST
        </Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <MaterialIcons
            name="format-list-bulleted-add"
            size={30}
            color="black"
            style={{ alignSelf: "center", marginTop: 12 }}
          />
        </Pressable>
      </View>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                placeholder="Enter todo title"
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter todo description"
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Pressable onPress={addTodo} style={styles.btn}>
                  <Text style={styles.btntext}>Add Todo</Text>
                </Pressable>
                <Pressable onPress={closeModal} style={styles.cbtn}>
                  <Text style={styles.btntext}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <FlatList
          data={todos}
          bounces={false}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  todoItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    elevation: 10,
    borderWidth: 1,
  },
  todoTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  btn: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#5c64d2",
    width: "45%",
  },
  cbtn: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ff0000",
    width: "45%",
  },
  btntext: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    width: "80%",
    borderRadius: 10,
    elevation: 10,
  },
});

export default Todo;
