import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/ordersSlice";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { setTips } from "../features/tipsSlice";
import { emptySplits } from "../features/splitsSlice";
import {
  ArrowLeftCircleIcon,
  PencilSquareIcon,
} from "react-native-heroicons/solid";
import { setBasket } from "../features/basketSlice";

const OrdersScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const orders = useSelector(getOrders);
  console.log("orders".orders);

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
    console.log(id, order.order);
    navigation.navigate("ModifyOrder", { id, index });
    dispatch(setBasket(order.order));
  };

  const renderOrders = orders?.map((order, index) => (
    <TouchableOpacity
      className="rounded-3xl p-10 mx-8 bg-green-600 flex-row items-center"
      onPress={() => sendToBasket(order.id)}
      key={uuid.v4()}
    >
      <Text className="font-extrabold text-2xl text-white flex-1">
        Order #{index + 1}
      </Text>
      <TouchableOpacity onPress={() => modifyOrder(order.id, index + 1)}>
        <PencilSquareIcon color="black" size={40} />
      </TouchableOpacity>
    </TouchableOpacity>
  ));

  return (
    <SafeAreaView className="h-full relative">
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
        </View>
      ) : (
        <ScrollView className="space-y-8">{renderOrders}</ScrollView>
      )}
    </SafeAreaView>
  );
};

export default OrdersScreen;
