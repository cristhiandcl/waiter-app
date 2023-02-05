import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { restaurants } from "../restaurants";
import Dish from "../components/Dish";
import { useDispatch, useSelector } from "react-redux";
import { emptyBasket, getBasketItems } from "../features/basketSlice";
import { setRestaurant } from "../features/restaurantSlice";
import { setTips } from "../features/tipsSlice";
import { addOrder, getOrders } from "../features/ordersSlice";
import uuid from "react-native-uuid";
import { WalletIcon } from "react-native-heroicons/solid";
import { arrayUnion, doc, getFirestore, setDoc } from "firebase/firestore";
import app from "../firebaseConfig";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);
const RestaurantScreen = () => {
  const user = getAuth(app).currentUser;
  const {
    params: { id },
  } = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const itemsOnbasket = useSelector(getBasketItems).length;
  const items = useSelector(getBasketItems);
  const orders = useSelector(getOrders);

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

  const createOrder = () => {
    (async () => {
      const id = uuid.v4();
      dispatch(addOrder({ order: items, id }));
      dispatch(emptyBasket());
      await setDoc(
        doc(db, "users", user.uid),
        { orders: arrayUnion({ id, order: items }) },
        { merge: true }
      );
      Alert.alert("Order", "Order created successfully");
    })();
  };

  return (
    <SafeAreaView className="h-full relative">
      {orders?.length > 0 && (
        <TouchableOpacity
          onPress={() => navigation.navigate("Orders")}
          className="absolute right-6 top-12"
        >
          <WalletIcon size={40} color="green" />
        </TouchableOpacity>
      )}
      <Text className="text-center text-3xl font-extrabold text-green-800 mt-6">
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
            onPress={createOrder}
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
