import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  getBasketItems,
  removeFromBasket,
} from "../features/basketSlice";

const Dish = ({ dish }) => {
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  const basketItems = useSelector(getBasketItems);
  console.log(basketItems);

  const addItemsToBasket = () => {
    dispatch(addToBasket(dish));
  };

  const removeItemsFromBasket = () => {
    dispatch(removeFromBasket);
  };

  return (
    <View className="w-3/4 mx-auto items-center space-y-1">
      <Text className="font-extrabold text-xl">{dish.name}</Text>
      <Text className="text-center font-semibold text-green-600">
        {dish.description}
      </Text>
      <Text className="text-red-600 font-extrabold">{dish.price}</Text>
      <View className="flex-row items-center space-x-2">
        <TouchableOpacity onPress={removeItemsFromBasket}>
          <MinusCircleIcon
            size={30}
            color={basketItems === 0 ? "gray" : "green"}
          />
        </TouchableOpacity>
        <Text>{basketItems.length}</Text>
        <TouchableOpacity onPress={() => addItemsToBasket()}>
          <PlusCircleIcon size={30} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dish;
