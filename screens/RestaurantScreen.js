import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/core";
import { restaurants } from "../restaurants";

const RestaurantScreen = () => {
  const {
    params: { id },
  } = useRoute();

  const restaurant = restaurants.filter(
    (restaurant) => restaurant.id === id
  )[0];

  return (
    <View className="mt-12">
      <Text>{restaurant.name}</Text>
    </View>
  );
};

export default RestaurantScreen;
