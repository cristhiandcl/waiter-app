import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { getOrders } from "../features/ordersSlice";

const OrdersScreen = () => {
  const orders = useSelector(getOrders);
  console.log(orders);
  return (
    <SafeAreaView>
      <Text className="font-extrabold text-3xl text-center text-green-800">
        Orders
      </Text>
    </SafeAreaView>
  );
};

export default OrdersScreen;
