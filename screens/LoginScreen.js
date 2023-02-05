import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { getFirestore } from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

const Login = () => {
  useEffect(() => {}, []);
  const [userData, onChangeText] = useState({
    email: "",
    password: "",
  });

  const navigation = useNavigation();

  // LogIn with Email and Password
  const logUser = () => {
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        onChangeText({ email: "", password: "" });
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        Alert.alert(
          "Login",
          error.message.replace("Firebase: Error (auth/", "").replace(").", ""),
          [{ text: "OK" }]
        );
      });
  };

  // Create user with Email and Password
  const createUser = () => {
    console.log(userData);
    navigation.navigate("SignIn");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        className="flex-1 items-center justify-center"
        onPress={() => Keyboard.dismiss()}
      >
        <Text className="text-4xl text-center text-green-700 font-extrabold mb-2">
          Welcome to the Orders Manager
        </Text>
        <Text className="w-3/4 text-center text-gray-400 font-extrabold text-xs mb-14 opacity-50">
          Login if you already have an account or create one to get access
        </Text>
        <View className="w-2/3 space-y-6">
          <View className="space-y-2">
            <Text className="font-extrabold">E-mail</Text>
            <TextInput
              className="border-2 p-2"
              value={userData.email}
              onChangeText={(data) =>
                onChangeText({ ...userData, email: data })
              }
              placeholder="Email"
              autoCapitalize="none"
            />
          </View>
          <View className="space-y-2">
            <Text className="font-extrabold">Password</Text>
            <TextInput
              className="border-2 p-2"
              value={userData.password}
              onChangeText={(data) =>
                onChangeText({ ...userData, password: data })
              }
              placeholder="Password"
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            className="bg-green-500 p-2 rounded"
            onPress={logUser}
          >
            <Text className="text-center font-bold text-white">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-blue-500 p-2 rounded"
            onPress={createUser}
          >
            <Text className="text-center font-bold text-white">
              Don't Have an Account ?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
