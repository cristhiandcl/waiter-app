import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getBasketItems } from "../features/basketSlice";

const BasketScreen = () => {
  const items = useSelector(getBasketItems);

  useEffect(() => {
    const duplicate = items?.reduce();
    console.log(duplicate);
    return () => {};
  }, []);

  console.log(items);

  return (
    <SafeAreaView className="">
      <Text className="text-center font-extrabold text-3xl text-green-800">
        Basket
      </Text>
    </SafeAreaView>
  );
};

export default BasketScreen;
