import { View, Text } from "react-native";
import React from "react";

const BasketItem = ({ item }) => {
  return (
    <View className="flex-row justify-around items-center">
      <View className="w-2/4">
        <Text className="font-extrabold text-lg ">{item[0].name}</Text>
        <Text className="font-semibold text-green-600 text-xs">
          {item[0].description}
        </Text>
        <Text className="text-red-600 font-extrabold mt-2 text-xs">
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
          })
            .format(item[0].price * item.length)
            .replace(",00", "")}
        </Text>
      </View>
      <View className="flex-row items-center space-x-2">
        <Text className="font-bold text-4xl text-green-600">{item.length}</Text>
      </View>
    </View>
  );
};

export default BasketItem;
