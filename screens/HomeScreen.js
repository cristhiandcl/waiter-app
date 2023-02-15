import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { restaurants } from "../restaurants";
import { useNavigation } from "@react-navigation/core";
import { client, urlFor } from "../sanity";
import { useEffect } from "react";
import { useState } from "react";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "restaurant"] {_id, description, name, rating, image,
          dishes[]->{description, name, image, price, _id}}`
      )
      .then((data) => setRestaurantes(data));
  }, []);
  console.log(restaurantes);
  const restaurantTriggered = (id) => {
    navigation.navigate("Restaurant", { id });
  };
  const renderRestaurants = restaurantes.map((restaurant) => (
    <TouchableOpacity
      onPress={() => restaurantTriggered(restaurant._id)}
      key={restaurant._id}
    >
      <Image
        source={{ uri: urlFor(restaurant.image).url() }}
        className="h-60 w-60 rounded-lg"
        style={{ resizeMode: "stretch" }}
      />
    </TouchableOpacity>
  ));

  // const renderRestaurants = restaurants.map((restaurant) => (
  //   <TouchableOpacity
  //     onPress={() => restaurantTriggered(restaurant.id)}
  //     key={restaurant.id}
  //   >
  //     <Image
  //       source={restaurant.image}
  //       className="h-60 w-60 rounded-lg"
  //       style={{ resizeMode: "stretch" }}
  //     />
  //   </TouchableOpacity>
  // ));

  return (
    <View className="mt-12 items-center">
      <ScrollView className="space-y-6" showsVerticalScrollIndicator={false}>
        {renderRestaurants}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
