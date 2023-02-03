import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Dish from "../components/Dish";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurant } from "../features/restaurantSlice";
import { emptyBasket, getBasketItems } from "../features/basketSlice";
import { modifyOrders } from "../features/ordersSlice";
import { XCircleIcon } from "react-native-heroicons/solid";

const ModifyOrderScreen = () => {
  const {
    params: { id, index },
  } = useRoute();

  const restaurant = useSelector(getRestaurant);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector(getBasketItems);

  const dishesToRender = restaurant.dishes.map((dish) => (
    <View key={dish.name}>
      <Dish dish={dish} />
    </View>
  ));

  const modifyOrder = () => {
    dispatch(modifyOrders({ order: items, id }));
    dispatch(emptyBasket());
    navigation.goBack();
    Alert.alert("Order", `Order #${index} Modified successfully`);
  };
  const abortModifying = () => {
    dispatch(emptyBasket());
    navigation.goBack();
  };
  return (
    <SafeAreaView className="h-full relative">
      <TouchableOpacity
        className="absolute top-12 left-4"
        onPress={abortModifying}
      >
        <XCircleIcon size={50} color="green" />
      </TouchableOpacity>
      <View className="mt-6 py-3">
        <ScrollView className="space-y-6" showsVerticalScrollIndicator={false}>
          {dishesToRender}
        </ScrollView>
      </View>

      <View className="mt-2">
        <TouchableOpacity
          onPress={modifyOrder}
          className="p-4 items-center w-2/5 mx-auto bg-green-800 rounded-xl flex-row space-x-3 justify-center"
        >
          <Text className="text-white font-extrabold">Modify Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ModifyOrderScreen;
