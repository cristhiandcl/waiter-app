import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { restaurants } from "../restaurants";
import Dish from "../components/Dish";
import { useSelector } from "react-redux";
import { getBasketItems } from "../features/basketSlice";

const RestaurantScreen = () => {
  const {
    params: { id },
  } = useRoute();
  const navigation = useNavigation();

  const itemsOnbasket = useSelector(getBasketItems).length;

  const restaurant = restaurants.filter(
    (restaurant) => restaurant.id === id
  )[0];

  const dishesToRender = restaurant.dishes.map((dish) => (
    <View key={dish.name}>
      <Dish dish={dish} />
    </View>
  ));

  const goToBasketScreen = () => {
    navigation.navigate("Basket");
  };

  const goToSplitAccountScreen = () => {};

  return (
    <SafeAreaView className="h-full">
      <Text className="text-center text-3xl font-extrabold text-green-800 mt-4">
        {restaurant.name}
      </Text>
      <View className={`mt-6 ${itemsOnbasket > 0 && "h-3/4"} py-3`}>
        <ScrollView className="space-y-6" showsVerticalScrollIndicator={false}>
          {dishesToRender}
        </ScrollView>
      </View>
      {itemsOnbasket > 0 && (
        <View className="flex-row mt-8">
          <TouchableOpacity
            onPress={goToBasketScreen}
            className="p-4 items-center w-2/5 mx-auto bg-green-800 rounded-xl flex-row space-x-4 justify-center"
          >
            <View className="border-white border rounded p-2">
              <Text className="text-white font-extrabold">{itemsOnbasket}</Text>
            </View>
            <Text className="text-white font-extrabold">Basket</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center w-2/5 mx-auto bg-green-800 rounded-xl justify-center"
            onPress={goToSplitAccountScreen}
          >
            <Text className="text-white font-extrabold">Split account</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default RestaurantScreen;
