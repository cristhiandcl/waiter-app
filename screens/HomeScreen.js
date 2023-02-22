import { View, Image, TouchableOpacity, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import { client, urlFor } from "../sanity";
import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import app from "../firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { getRestaurant, setRestaurant } from "../features/restaurantSlice";
import axios from "axios";

const db = getFirestore(app);

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const restaurant = useSelector(getRestaurant)[0];
  const dispatch = useDispatch();
  const user = getAuth(app).currentUser;
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      setRestaurantName(docSnap.data().restaurantName.toLowerCase());
    })();
    client
      .fetch(
        `*[_type == "restaurant"] {_id, description, name, rating, image,
          dishes[]->{description, name, image, price, _id}}`
      )
      .then((data) =>
        dispatch(
          setRestaurant(
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

  const goToRestaurantScreen = () => {
    navigation.navigate("Restaurant");
  };

  const getDataFromFastAPI = () => {
    axios
      .get("http://127.0.0.1:8000/items")
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <View
      className="items-center flex-1 justify-center"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {restaurant && (
        <TouchableOpacity onPress={goToRestaurantScreen} key={restaurant.id}>
          <Image
            source={{ uri: urlFor(restaurant.image).url() }}
            className="h-60 w-60 rounded-lg"
            style={{ resizeMode: "stretch" }}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        className="bg-green-800 p-4 mt-4 rounded-xl"
        onPress={getDataFromFastAPI}
      >
        <Text className="text-white font-extrabold">Get Data From FastAPI</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
