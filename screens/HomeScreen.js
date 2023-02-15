import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import { client, urlFor } from "../sanity";
import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants, setRestaurants } from "../features/restaurantsSlice";
import app from "../firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useState } from "react";

const db = getFirestore(app);

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const restaurant = useSelector(getRestaurants)[0];
  const dispatch = useDispatch();
  const user = getAuth(app).currentUser;
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      setRestaurantName(docSnap.data().restaurantName);
    })();
    client
      .fetch(
        `*[_type == "restaurant"] {_id, description, name, rating, image,
          dishes[]->{description, name, image, price, _id}}`
      )
      .then((data) =>
        dispatch(
          setRestaurants(
            data
              .map((restaurant) => ({
                ...restaurant,
                id: restaurant._id,
                dishes: restaurant.dishes.map((dish) => ({
                  ...dish,
                  id: dish._id,
                })),
              }))
              .filter(
                (restaurant) => restaurant.name.toLowerCase() === restaurantName
              )
          )
        )
      );
  }, [restaurantName]);

  console.log(restaurantName, restaurant);
  const restaurantTriggered = (id) => {
    navigation.navigate("Restaurant", { id });
  };

  // const renderRestaurants = restaurant?.map((restaurant) => (
  //   <TouchableOpacity
  //     onPress={() => restaurantTriggered(restaurant.id)}
  //     key={restaurant.id}
  //   >
  //     <Image
  //       source={{ uri: urlFor(restaurant.image).url() }}
  //       className="h-60 w-60 rounded-lg"
  //       style={{ resizeMode: "stretch" }}
  //     />
  //   </TouchableOpacity>
  // ));

  return (
    <View
      className="items-center flex-1 justify-center"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {/* <ScrollView className="space-y-6" showsVerticalScrollIndicator={false}>
        {renderRestaurants}
      </ScrollView> */}
      {restaurant && (
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
      )}
    </View>
  );
};

export default HomeScreen;
