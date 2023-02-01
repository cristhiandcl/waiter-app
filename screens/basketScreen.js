import { View, Text, SafeAreaView } from "react-native";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getBasketItems } from "../features/basketSlice";
import BasketItem from "../components/BasketItem";

const BasketScreen = () => {
  const items = useSelector(getBasketItems);
  const [groupedItemsInBasket, setGroupItemsInBasket] = useState();

  useMemo(() => {
    let individualItems = [],
      groupAllItems = [];
    items.map((_, index) => {
      if (items[index]?.id === items[index + 1]?.id) {
        individualItems.push(items[index]);
      } else {
        individualItems.length === 0
          ? individualItems.push(items[index])
          : individualItems.push(items[index - 1]);
        groupAllItems.push(individualItems);
        individualItems = [];
      }
    });

    setGroupItemsInBasket(groupAllItems);
  }, [items]);

  const renderBasketItems = groupedItemsInBasket?.map((item) => (
    <View key={item.id}>
      <BasketItem item={item} />
    </View>
  ));

  console.log(groupedItemsInBasket);
  return (
    <View className="">
      <Text className="text-center font-extrabold text-3xl text-green-800 mb-10 mt-4">
        Basket
      </Text>
      <View className="space-y-6">{renderBasketItems}</View>
    </View>
  );
};

export default BasketScreen;
