import firebase from "firebase/compat/app";
import { useState, useEffect } from "react";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";
import userStore from "../state-management/AppUser";

const MessagesScreen = (props) => {
  const [users, setUsers] = useState(null);
  const { user } = userStore();

  const getUsers = async () => {
    const querySanp = await firebase
      .firestore()
      .collection("Users")
      .where("uid", "!=", user.uid)
      .get();
    const allUsers = querySanp.docs.map((docSnap) => docSnap.data());
    console.log(allUsers);
    setUsers(allUsers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
        <View style={styles.contain}>
          <FlatList
            data={users}
            keyExtractor={(item) => item.uid}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  props.setChatHeader(item.name);
                  props.navigation.navigate("chatScreen", {
                    name: item.name,
                    uid: item.uid,
                  });
                }}
              >
                <View style={styles.card}>
                  {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.image} />
                  ) : (
                    <Image
                      source={require("../assets/images/user-profile.png")}
                      style={styles.image}
                    />
                  )}
                  <View style={styles.textArea}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <Text style={styles.msgContent}>{item.email}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
  },
  userImageST: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
    resizeMode: "contain",
  },
  textArea: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  msgContent: {
    fontSize: 16,
    color: "#666",
  },
});
