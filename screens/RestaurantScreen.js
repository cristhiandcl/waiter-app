import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { restaurants } from "../restaurants";
import Dish from "../components/Dish";
import { useDispatch, useSelector } from "react-redux";
import { emptyBasket, getBasketItems } from "../features/basketSlice";
import { setRestaurant } from "../features/restaurantSlice";
import { setTips } from "../features/tipsSlice";
import { addOrder } from "../features/ordersSlice";
import uuid from "react-native-uuid";

const RestaurantScreen = () => {
  const {
    params: { id },
  } = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const itemsOnbasket = useSelector(getBasketItems).length;
  const items = useSelector(getBasketItems);

  const restaurant = restaurants.filter(
    (restaurant) => restaurant.id === id
  )[0];

  useEffect(() => {
    dispatch(setRestaurant(restaurant));
    dispatch(
      setTips([
        { value: 1000, isPressed: true, id: 0 },
        { value: 2000, isPressed: false, id: 1 },
        { value: 4000, isPressed: false, id: 2 },
        { value: "Other", isPressed: false, id: 3 },
      ])
    );
  }, []);

  const dishesToRender = restaurant.dishes.map((dish) => (
    <View key={dish.name}>
      <Dish dish={dish} />
    </View>
  ));

  const goToOrdersScreen = () => {
    navigation.navigate("Orders");
    dispatch(addOrder({ order: items, id: uuid.v4() }));
    dispatch(emptyBasket());
  };

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
        <View className="mt-8">
          <TouchableOpacity
            onPress={goToOrdersScreen}
            className="p-4 items-center w-2/5 mx-auto bg-green-800 rounded-xl flex-row space-x-3 justify-center"
          >
            <View className="bg-green-600 rounded p-2">
              <Text className="text-white font-extrabold">{itemsOnbasket}</Text>
            </View>
            <Text className="text-white font-extrabold">Create Order</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default RestaurantScreen;
