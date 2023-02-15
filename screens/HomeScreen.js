import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import { client, urlFor } from "../sanity";
import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants, setRestaurants } from "../features/restaurantsSlice";

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const restaurants = useSelector(getRestaurants);
  const dispatch = useDispatch();

  useEffect(() => {
    client
      .fetch(
        `*[_type == "restaurant"] {_id, description, name, rating, image,
          dishes[]->{description, name, image, price, _id}}`
      )
      .then((data) =>
        dispatch(
          setRestaurants(
            data.map((restaurant) => ({
              ...restaurant,
              id: restaurant._id,
              dishes: restaurant.dishes.map((dish) => ({
                ...dish,
                id: dish._id,
              })),
            }))
          )
        )
      );
  }, []);

  const restaurantTriggered = (id) => {
    navigation.navigate("Restaurant", { id });
  };

  const renderRestaurants = restaurants?.map((restaurant) => (
    <TouchableOpacity
      onPress={() => restaurantTriggered(restaurant.id)}
      key={restaurant.id}
    >
      <Image
        source={{ uri: urlFor(restaurant.image).url() }}
        className="h-60 w-60 rounded-lg"
        style={{ resizeMode: "stretch" }}
      />
    </TouchableOpacity>
  ));

  return (
    <View
      className="items-center"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <ScrollView className="space-y-6" showsVerticalScrollIndicator={false}>
        {renderRestaurants}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
