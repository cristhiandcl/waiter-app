import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { getOrders } from "../features/ordersSlice";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

const OrdersScreen = () => {
  const navigation = useNavigation();
  const orders = useSelector(getOrders);
  console.log(orders);

  const sendToBasket = (id) => {
    navigation.navigate("Basket", { id });
  };

  const renderOrders = orders?.map((order, index) => (
    <TouchableOpacity
      className="rounded-3xl p-10 mx-8 bg-green-600"
      onPress={() => sendToBasket(order.id)}
      key={uuid.v4()}
    >
      <Text className="text-center font-extrabold text-2xl text-white">
        Order #{index + 1}
      </Text>
    </TouchableOpacity>
  ));

  return (
    <SafeAreaView className="h-full">
      <Text className="font-extrabold text-3xl text-center text-green-800 mb-8">
        Orders
      </Text>
      <ScrollView className="space-y-8">{renderOrders}</ScrollView>
    </SafeAreaView>
  );
};

export default OrdersScreen;
