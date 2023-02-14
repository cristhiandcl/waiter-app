import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurant } from "../features/restaurantSlice";
import BasketItem from "../components/BasketItem";
import { ChevronRightIcon, XCircleIcon } from "react-native-heroicons/solid";
import Tip from "../components/Tip";
import { getTips } from "../features/tipsSlice";
import uuid from "react-native-uuid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getOrders, removeOrder } from "../features/ordersSlice";
import { emptySplits, getSplits } from "../features/splitsSlice";
import { getAuth } from "firebase/auth";
import app from "../firebaseConfig";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import SplitsRendering from "../components/SplitsRendering";

const db = getFirestore(app);

const BasketScreen = () => {
  const user = getAuth(app).currentUser;
  const {
    params: { id },
  } = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector(getOrders)?.filter((order) => order.id === id)[0]
    ?.order;
  const order = useSelector(getOrders)?.filter((order) => order.id === id)[0];
  const total = items?.reduce((prev, next) => prev + next.price, 0);
  const restaurant = useSelector(getRestaurant);
  const [groupedItemsInBasket, setGroupItemsInBasket] = useState();
  const tipValues = useSelector(getTips);
  const tip = tipValues?.filter((tip) => tip.isPressed === true)[0]?.value || 0;
  const [otherTip, setOtherTip] = useState(0);
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [input, onChangeInput] = useState(0);
  const splits = useSelector(getSplits);

  useEffect(() => {
    tip === "Other" && setModal2Visible(true);
    tip === "Other" && onChangeInput(0);
  }, [tip]);

  useMemo(() => {
    const itemsArranged = [...items];
    let individualItems = [],
      groupAllItems = [];
    itemsArranged?.sort((r1, r2) =>
      r1.id > r2.id ? 1 : r1.id < r2.id ? -1 : 0
    );
    itemsArranged?.map((_, index) => {
      if (itemsArranged[index]?.id === itemsArranged[index + 1]?.id) {
        individualItems.push(itemsArranged[index]);
      } else {
        individualItems.length === 0
          ? individualItems.push(itemsArranged[index])
          : individualItems.push(itemsArranged[index - 1]);
        groupAllItems.push(individualItems);
        individualItems = [];
      }
    });

    setGroupItemsInBasket(groupAllItems);
  }, [items]);

  const renderSplits = splits.map((split, index) => (
    <SplitsRendering split={split} index={index} key={uuid.v4()} />
  ));

  const renderBasketItems = groupedItemsInBasket?.map((item) => (
    <View key={uuid.v4()}>
      <BasketItem item={item} />
    </View>
  ));

  const showBasketItems = () => {
    setModal1Visible(true);
  };

  const onChangeNumber = (value) => {
    onChangeInput(value);
  };

  const addTip = () => {
    setOtherTip(input);
    setModal2Visible(false);
  };

  const noTip = () => {
    setOtherTip(0);
    setModal2Visible(false);
  };

  const goTosplitScreen = () => {
    dispatch(emptySplits());
    navigation.navigate("SplitAccount", { id });
  };

  const sendOrder = () => {
    (async () => {
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      dispatch(removeOrder(id));
      const tipValue = tip === "Other" ? otherTip : tip;
      await setDoc(
        doc(db, "users", user.uid),
        {
          orders: arrayRemove(order),
          history: arrayUnion({
            order,
            tip: parseInt(tipValue),
            date: `${day}-${month}-${year}`,
          }),
        },
        { merge: true }
      );
    })();
    Alert.alert("Order", "Order Finished Successfully");
    navigation.goBack();
  };

  return (
    <View className="h-full">
      <View className="flex-1">
        <Text className="text-center font-extrabold text-3xl text-green-800 my-7">
          Order
        </Text>
        <ScrollView className="shadow-2xls bg-white shadow-2xl py-4">
          <TouchableOpacity
            className="flex-row items-center mx-6"
            onPress={showBasketItems}
          >
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
                <Text className="text-xs">{items?.length} Products</Text>
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
                <Tip tip={tip} key={index} otherTip={otherTip} />
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
            <View>{renderSplits}</View>
            <View className="flex-row">
              <Text className="flex-1">Tip</Text>
              <Text>
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                })
                  .format(tip === "Other" ? otherTip : tip)
                  .replace(",00", "")}
              </Text>
            </View>
          </View>
          <View className="py-10 items-center border-t mx-6 border-gray-300 mt-4">
            <TouchableOpacity
              className="p-4 w-2/4 bg-gray-200 rounded-2xl"
              onPress={goTosplitScreen}
            >
              <Text className="text-center font-extrabold">Split Order</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modal1Visible}
          >
            <View className="h-96 absolute bottom-0 w-screen bg-green-200 rounded-t-3xl">
              <Text className="font-extrabold text-2xl mb-5 mt-6 ml-4 border border-gray-400">
                {restaurant?.name}
              </Text>
              <ScrollView className="space-y-4 mb-8">
                {renderBasketItems}
              </ScrollView>
              <Pressable
                onPress={() => setModal1Visible(false)}
                className="absolute right-4 top-4"
              >
                <XCircleIcon size={50} color="green" />
              </Pressable>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modal2Visible}
          >
            <KeyboardAvoidingView behavior="padding" className="h-full">
              <View className="84 w-screen bg-green-200 rounded-t-3xl mt-auto pb-10">
                <Text className="font-extrabold text-3xl mb-10 mt-6 ml-4 border border-gray-400">
                  Enter Amount
                </Text>
                <TextInput
                  caretHidden={true}
                  autoFocus={true}
                  placeholder="0"
                  placeholderTextColor="black"
                  className="w-2/4 mx-auto font-extrabold text-4xl text-center"
                  value={input}
                  onChangeText={onChangeNumber}
                  keyboardType="numeric"
                />
                <View className="items-center space-y-4 mt-6">
                  <TouchableOpacity
                    className="bg-green-600 p-4 w-3/5 rounded-3xl items-center"
                    onPress={addTip}
                  >
                    <Text className="text-white font-extrabold">Add Tip</Text>
                  </TouchableOpacity>
                  <Pressable
                    className="bg-white p-4 w-3/5 rounded-3xl items-center"
                    onPress={noTip}
                  >
                    <Text className="text-green-600 font-extrabold">
                      Without Tip
                    </Text>
                  </Pressable>
                </View>

                <Pressable
                  onPress={() => setModal2Visible(false)}
                  className="absolute right-4 top-4"
                >
                  <XCircleIcon size={50} color="green" />
                </Pressable>
              </View>
            </KeyboardAvoidingView>
          </Modal>
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
              .format(total + (tip === "Other" ? parseInt(otherTip) : tip))
              .replace(",00", "")}
          </Text>
        </View>
        <TouchableOpacity
          className="bg-green-600 px-12 py-4 rounded-3xl"
          onPress={sendOrder}
        >
          <Text className="text-white font-extrabold ">Finish Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BasketScreen;
