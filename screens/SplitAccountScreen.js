import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/ordersSlice";
import { setSplits } from "../features/splitsSlice";
import uuid from "react-native-uuid";
import "intl";
import "intl/locale-data/jsonp/es"; // Import the locales you need

const SplitAccountScreen = () => {
  const {
    params: { id },
  } = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const items = useSelector(getOrders)?.filter((order) => order.id === id)[0]
    ?.order;
  const [order, setOrder] = useState(items);
  const [split, setSplit] = useState([]);

  const AdditemsToAccount = (id) => {
    const index = order.findIndex((item) => item.id === id);
    const mirror = [...order];
    mirror.splice(index, 1);
    setSplit((prev) => [...prev, order[index]]);
    setOrder([...mirror]);
  };

  const addSplit = () => {
    dispatch(setSplits(split));
    setSplit([]);
    Alert.alert("Split", "Split Added");
    order.length === 0 && navigation.goBack();
  };

  const renderItems = order?.map((item) => (
    <TouchableOpacity
      className="p-7 bg-green-600 rounded-full"
      onPress={() => AdditemsToAccount(item.id)}
      key={uuid.v4()}
    >
      <Text className="text-center font-extrabold text-xl text-white">
        {item.name}
      </Text>
      <Text className="text-center font-bold text-xs text-red-600">
        {new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
        })
          .format(item.price)
          .replace(",00", "")}
      </Text>
    </TouchableOpacity>
  ));

  return (
    <View className="h-full">
      <Text className="font-extrabold text-3xl text-center my-4">
        Split Order
      </Text>
      {order.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-5xl font-extrabold text-center w-3/5">
            There are no Items left
          </Text>
          <View className="flex-row items-center space-x-1 mt-4">
            <Text className="font-bold">Press</Text>
            <View className="bg-gray-300 rounded-lg p-2 ">
              <Text className="font-bold">Add Split</Text>
            </View>
            <Text className="font-bold">to finish</Text>
          </View>
        </View>
      ) : (
        <ScrollView className="space-y-8">{renderItems}</ScrollView>
      )}
      <TouchableOpacity
        className="p-6 bg-gray-300 mx-8 my-10 rounded-xl"
        onPress={addSplit}
      >
        <Text className="text-center font-extrabold text-xl">Add Split</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplitAccountScreen;
