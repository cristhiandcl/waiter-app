import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/ordersSlice";
import { setSplits } from "../features/splitsSlice";
import uuid from "react-native-uuid";

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

  useEffect(() => {
    order.length === 0 && console.log("empty");
  }, [order.length]);

  const addSplit = () => {
    dispatch(setSplits(split));
    setSplit([]);
    Alert.alert("Split", "Split Added");
    order.length === 0 && navigation.goBack();
  };
  console.log("splits", split);
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
      <ScrollView
        className="mx-4 space-y-4 my-4"
        showsVerticalScrollIndicator={false}
      >
        {renderItems}
      </ScrollView>
      <TouchableOpacity className="p-6 bg-gray-300 mx-8 my-10 rounded-xl">
        <Text className="text-center font-extrabold text-xl" onPress={addSplit}>
          Add Split
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplitAccountScreen;
