import { View, Text, TouchableOpacity, Image } from "react-native";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  getBasketItems,
  removeFromBasket,
} from "../features/basketSlice";
import { urlFor } from "../sanity";

const Dish = ({ dish }) => {
  const dispatch = useDispatch();
  const basketItems = useSelector(getBasketItems);
  const amount = basketItems.filter((item) => item.id === dish.id).length;

  const addItemsToBasket = () => {
    dispatch(addToBasket(dish));
  };

  const removeItemsFromBasket = () => {
    amount !== 0 && dispatch(removeFromBasket(dish.id));
  };

  return (
    <View className="flex-row mx-auto items-center space-x-4 justify-center">
      <Image
        source={{ uri: urlFor(dish.image).url() }}
        className="h-40 w-40 rounded-lg"
        style={{ resizeMode: "stretch" }}
      />
      <View className="w-2/5 items-center space-y-1">
        <Text className="font-extrabold text-xl">{dish.name}</Text>
        <Text className="text-center font-semibold text-green-600">
          {dish.description}
        </Text>
        <Text className="text-red-600 font-extrabold">
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
          })
            .format(dish.price)
            .replace(",00", "")}
        </Text>
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity onPress={removeItemsFromBasket}>
            <MinusCircleIcon
              size={30}
              color={amount === 0 ? "gray" : "green"}
            />
          </TouchableOpacity>
          <Text>{amount}</Text>
          <TouchableOpacity onPress={addItemsToBasket}>
            <PlusCircleIcon size={30} color="green" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Dish;
