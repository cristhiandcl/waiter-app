import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { restaurants } from "../restaurants";
import { useNavigation } from "@react-navigation/core";
import { client } from "../sanity";
import { useEffect } from "react";

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    client
      .fetch(
        `*[_type == "restaurant"] {...,
          dishes[]->
        }`
      )
      .then((data) => console.log(data));

    console.log("Rendered");
  }, []);

  const restaurantTriggered = (id) => {
    navigation.navigate("Restaurant", { id });
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
