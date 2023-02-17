import { View, Text, Image } from "react-native";
import React from "react";
import { urlFor } from "../sanity";
import "intl";
import "intl/locale-data/jsonp/es"; // Import the locales you need

const BasketItem = ({ item }) => {
  return (
    <View className="flex-row items-center justify-around">
      <View className="flex-row items-center space-x-2">
        <Image
          source={{ uri: urlFor(item[0].image).url() }}
          className="h-20 w-20 rounded-lg"
          style={{ resizeMode: "stretch" }}
        />
        <View className="w-2/4 space-y-1">
          <Text className="font-extrabold text-justify text-xs">
            {item[0].name}
          </Text>
          <Text className="font-semibold text-justify text-green-600 text-[8px]">
            {item[0].description}
          </Text>
          <Text className="text-red-600 text-justify font-extrabold text-xs">
            {new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
            })
              .format(item[0].price * item.length)
              .replace(",00", "")}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center space-x-2">
        <Text className="font-bold text-4xl text-green-600">{item.length}</Text>
      </View>
    </View>
  );
};

export default BasketItem;
