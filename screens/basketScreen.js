import { View, Text, SafeAreaView } from "react-native";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getBasketItems } from "../features/basketSlice";

const BasketScreen = () => {
  const items = useSelector(getBasketItems);
  const [groupedItemsInBasket, setGroupItemsInBasket] = useState();

  useMemo(() => {
    const groupItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupItemsInBasket(groupItems);
  }, [items]);

  console.log(groupedItemsInBasket);

  return (
    <SafeAreaView className="">
      <Text className="text-center font-extrabold text-3xl text-green-800">
        Basket
      </Text>
    </SafeAreaView>
  );
};

export default BasketScreen;
