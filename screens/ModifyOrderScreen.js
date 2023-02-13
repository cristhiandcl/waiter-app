import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Dish from "../components/Dish";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurant } from "../features/restaurantSlice";
import { emptyBasket, getBasketItems } from "../features/basketSlice";
import { getOrders, modifyOrders } from "../features/ordersSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const db = getFirestore(app);

const ModifyOrderScreen = () => {
  const insets = useSafeAreaInsets();
  const {
    params: { id, index },
  } = useRoute();
  const user = getAuth(app).currentUser;
  const restaurant = useSelector(getRestaurant);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector(getBasketItems);
  const orders = useSelector(getOrders);

  const dishesToRender = restaurant.dishes.map((dish) => (
    <View key={dish.name}>
      <Dish dish={dish} />
    </View>
  ));

  useEffect(() => {
    dispatch(modifyOrders({ order: items, id }));
  }, [items.length]);

  const modifyOrder = () => {
    (async () => {
      dispatch(emptyBasket());
      await setDoc(doc(db, "users", user.uid), { orders }, { merge: true });
      Alert.alert("Order", `Order #${index} Modified successfully`);
    })();
    navigation.goBack();
  };
  const abortModifying = () => {
    dispatch(emptyBasket());
    navigation.goBack();
  };

  return (
    <View
      className="h-full relative"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
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
    </View>
  );
};

export default ModifyOrderScreen;
