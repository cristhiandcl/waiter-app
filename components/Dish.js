import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";

const Dish = ({ name, description, price }) => {
  const [amount, setAmount] = useState(0);

  const addAmount = () => {
    setAmount((prev) => prev + 1);
  };

  const removeAmount = () => {
    amount > 0 && setAmount((prev) => prev - 1);
  };

  return (
    <View className="w-3/4 mx-auto items-center space-y-1">
      <Text className="font-extrabold text-xl">{name}</Text>
      <Text className="text-center font-semibold text-green-600">
        {description}
      </Text>
      <Text className="text-red-600 font-extrabold">{price}</Text>
      <View className="flex-row items-center space-x-2">
        <TouchableOpacity onPress={removeAmount}>
          <MinusCircleIcon size={30} color={amount === 0 ? "gray" : "green"} />
        </TouchableOpacity>
        <Text>{amount}</Text>
        <TouchableOpacity onPress={addAmount}>
          <PlusCircleIcon size={30} color="green"/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dish;
