import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, removeOrder } from "../features/ordersSlice";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { setTips } from "../features/tipsSlice";
import { emptySplits } from "../features/splitsSlice";
import {
  ArrowLeftCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "react-native-heroicons/solid";
import { setBasket } from "../features/basketSlice";
import { arrayRemove, doc, getFirestore, setDoc } from "firebase/firestore";
import app from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect } from "react";

const db = getFirestore(app);

const OrdersScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const orders = useSelector(getOrders);
  const user = getAuth(app).currentUser;

  const sendToBasket = (id) => {
    dispatch(
      setTips([
        { value: 1000, isPressed: true, id: 0 },
        { value: 2000, isPressed: false, id: 1 },
        { value: 4000, isPressed: false, id: 2 },
        { value: "Other", isPressed: false, id: 3 },
      ])
    );
    dispatch(emptySplits());
    navigation.navigate("Basket", { id });
  };

  const modifyOrder = (id, index) => {
    const order = orders.filter((order) => order.id === id)[0];
    navigation.navigate("ModifyOrder", { id, index });
    dispatch(setBasket(order.order));
  };

  const deleteOrder = async (order, index) => {
    dispatch(removeOrder(order.id));
    await setDoc(
      doc(db, "users", user.uid),
      { orders: arrayRemove(order) },
      { merge: true }
    );
    Alert.alert("Order", `Order #${index + 1} Canceled successfully`);
  };

  const renderOrders = orders?.map((order, index) => (
    <TouchableOpacity
      className="rounded-3xl p-10 mx-6 bg-green-600 flex-row items-center justify-between"
      onPress={() => sendToBasket(order.id)}
      key={uuid.v4()}
    >
      <TouchableOpacity onPress={() => deleteOrder(order, index)}>
        <TrashIcon color="red" size={40} />
      </TouchableOpacity>
      <Text className="font-extrabold text-2xl text-white">
        Order #{index + 1}
      </Text>
      <TouchableOpacity onPress={() => modifyOrder(order.id, index + 1)}>
        <PencilSquareIcon color="black" size={40} />
      </TouchableOpacity>
    </TouchableOpacity>
  ));

  useEffect(() => {
    orders?.length === 0 && navigation.goBack();
  }, [orders?.length]);

  return (
    <View
      className="h-full relative"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <Text className="font-extrabold text-4xl text-center text-green-800 mb-8 mt-4">
        Orders
      </Text>
      <TouchableOpacity
        onPress={navigation.goBack}
        className="absolute top-11 left-4"
      >
        <ArrowLeftCircleIcon size={50} color="green" />
      </TouchableOpacity>
      {orders.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-5xl font-extrabold text-center w-3/5">
            There are no Orders left
          </Text>
          <View className="flex-row items-center space-x-1 mt-4">
            <Text className="font-bold">Press </Text>
            <ArrowLeftCircleIcon color="green" size={30} />
            <Text className="font-bold">to create a new order</Text>
          </View>
        </View>
      ) : (
        <ScrollView className="space-y-8">{renderOrders}</ScrollView>
      )}
    </View>
  );
};

export default OrdersScreen;
