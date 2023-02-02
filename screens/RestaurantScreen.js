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

  const restaurant = restaurants.filter(
    (restaurant) => restaurant.id === id
  )[0];

  useEffect(() => {
    dispatch(setRestaurant(restaurant));
    // dispatch(emptyBasket());
    dispatch(
      setTips([
        { value: 1000, isPressed: false, id: 0 },
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

  const goToBasketScreen = () => {
    // navigation.navigate("Basket");
    navigation.navigate("Orders");
    dispatch(addOrder({ order: itemsOnbasket, id: uuid.v4() }));
    dispatch(emptyBasket());
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
        <View className="mt-8">
          <TouchableOpacity
            onPress={goToBasketScreen}
            className="p-4 items-center w-2/5 mx-auto bg-green-800 rounded-xl flex-row space-x-3 justify-center"
          >
            <View className="bg-green-600 rounded p-2">
              <Text className="text-white font-extrabold">{itemsOnbasket}</Text>
            </View>
            <Text className="text-white font-extrabold">Create Order</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            className="items-center w-2/5 mx-auto bg-white rounded-xl justify-center"
            onPress={goToSplitAccountScreen}
          >
            <Text className="text-green-800 font-extrabold">Split account</Text>
          </TouchableOpacity> */}
        </View>
      )}
    </SafeAreaView>
  );
};

export default RestaurantScreen;
