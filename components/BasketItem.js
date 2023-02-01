import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { TrashIcon } from "react-native-heroicons/solid";
import { removeFromBasket } from "../features/basketSlice";
import { useDispatch } from "react-redux";

const BasketItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeItemsFromBasket = () => {
    dispatch(removeFromBasket(item[0].id));
  };

  return (
    <View className="flex-row justify-center items-baseline">
      <View className="w-3/4">
        <Text className="font-extrabold text-lg">{item[0].name}</Text>
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
        <Text className="font-bold">{item.length}</Text>
        <TouchableOpacity onPress={removeItemsFromBasket}>
          <TrashIcon size={28} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BasketItem;
