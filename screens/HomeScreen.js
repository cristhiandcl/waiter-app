import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { restaurants } from "../restaurants";

const HomeScreen = () => {
  const restaurantTriggered = (id) => {
    console.log(id);
  };

  const renderRestaurants = restaurants.map((restaurant) => (
    <TouchableOpacity
      onPress={() => restaurantTriggered(restaurant.id)}
      key={restaurant.id}
    >
      <Image
        source={restaurant.image}
        className="h-60 w-60 rounded-lg"
        style={{ resizeMode: "stretch" }}
      />
    </TouchableOpacity>
  ));

  return (
    <View className="mt-12 items-center">
      <ScrollView className="space-y-6">{renderRestaurants}</ScrollView>
    </View>
  );
};

export default HomeScreen;
