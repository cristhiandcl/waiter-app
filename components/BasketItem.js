import { View, Text } from "react-native";
import React from "react";
import { TrashIcon } from "react-native-heroicons/solid";

const BasketItem = ({ item }) => {
  return (
    <View className="w-3/4 mx-auto items-center space-y-1">
      <Text className="font-extrabold text-xl">{item[0].name}</Text>
      <Text className="text-center font-semibold text-green-600">
        {item[0].description}
      </Text>
      <Text className="text-red-600 font-extrabold">{item[0].price}</Text>
      <View className="flex-row items-center space-x-2">
        <Text>{item.length}</Text>
        {/* <TouchableOpacity onPress={addItemsToBasket}> */}
        <TrashIcon size={30} color="green" />
        {/* </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default BasketItem;
