import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/core";
import { restaurants } from "../restaurants";
import Dish from "../components/Dish";

const RestaurantScreen = () => {
  const {
    params: { id },
  } = useRoute();

  const restaurant = restaurants.filter(
    (restaurant) => restaurant.id === id
  )[0];

  const dishesToRender = restaurant.dishes.map((dish) => (
    <View key={dish.name}>
      <Dish
        name={dish.name}
        description={dish.description}
        price={dish.price}
      />
    </View>
  ));

  return (
    <SafeAreaView className="h-full">
      <Text className="text-center text-3xl font-extrabold text-green-800">
        {restaurant.name}
      </Text>
      <View className="my-1">
        <ScrollView className="space-y-6 py-4">{dishesToRender}</ScrollView>
      </View>
      <View className="flex-row">
        <TouchableOpacity className="p-4 items-center w-2/5 mx-auto bg-green-800 rounded-xl">
          <Text className="text-white font-extrabold">Go to pay</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-4 items-center w-2/5 mx-auto bg-green-800 rounded-xl">
          <Text className="text-white font-extrabold">Split account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RestaurantScreen;
