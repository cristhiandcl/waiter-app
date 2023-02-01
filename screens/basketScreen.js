import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getBasketItems } from "../features/basketSlice";
import { getRestaurant } from "../features/restaurantSlice";
import BasketItem from "../components/BasketItem";
import { ChevronRightIcon } from "react-native-heroicons/solid";
import Tip from "../components/Tip";
import { getTips } from "../features/tipsSlice";

const BasketScreen = () => {
  const items = useSelector(getBasketItems);
  const total = items.reduce((prev, next) => prev + next.price, 0);
  const restaurant = useSelector(getRestaurant);
  const [groupedItemsInBasket, setGroupItemsInBasket] = useState();
  const tipValues = useSelector(getTips);
  const tip = tipValues?.filter((tip) => tip.isPressed === true)[0]?.value || 0;

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

  // console.log(tip);

  const renderBasketItems = groupedItemsInBasket?.map((item) => (
    <View>
      <BasketItem item={item} key={item.name} />
    </View>
  ));

  console.log(groupedItemsInBasket);
  return (
    <View className="h-full">
      <View className="flex-1">
        <Text className="text-center font-extrabold text-3xl text-green-800 my-7">
          Order
        </Text>
        <ScrollView className="shadow-2xls bg-white shadow-2xl py-4">
          {/* <View className="space-y-6">{renderBasketItems}</View> */}
          <TouchableOpacity className="flex-row items-center mx-6">
            <View className="flex-1 flex-row items-center space-x-3">
              <Image
                source={restaurant?.image}
                className="h-12 w-12 rounded-full"
                style={{ resizeMode: "stretch" }}
              />
              <View>
                <Text className="font-extrabold text-base">
                  {restaurant?.name}
                </Text>
                <Text className="text-xs">{items.length} Products</Text>
              </View>
            </View>
            <ChevronRightIcon color="green" />
          </TouchableOpacity>
          <View className="mx-6 border-t my-4 border-gray-300">
            <Text className="mt-9 font-extrabold text-base">Tip</Text>
            <Text className="font-bold text-xs mt-2">
              Without your waiter, it wouldn't be possible!
            </Text>
            <Text className="text-xs opacity-50">
              100% of your tip goes to your waiter
            </Text>
            <View className="flex-row justify-around mt-6">
              {tipValues?.map((tip, index) => (
                <Tip tip={tip} key={index} />
              ))}
            </View>
          </View>
          <View className="mx-6 border-t my-4 border-gray-300 space-y-6">
            <Text className="mt-10 font-extrabold text-base">
              Order details
            </Text>
            <View className="flex-row">
              <Text className="flex-1">Products</Text>
              <Text>
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                })
                  .format(total)
                  .replace(",00", "")}
              </Text>
            </View>
            <View className="flex-row">
              <Text className="flex-1">Tip</Text>
              <Text>
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                })
                  .format(tip)
                  .replace(",00", "")}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View className="flex-row justify-between items-center py-6 mx-6">
        <View>
          <Text>Total Due</Text>
          <Text className="font-extrabold text-lg">
            {new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
            })
              .format(total + tip)
              .replace(",00", "")}
          </Text>
        </View>
        <TouchableOpacity className="bg-green-600 px-12 py-4 rounded-3xl">
          <Text className="text-white font-extrabold ">Create Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BasketScreen;
