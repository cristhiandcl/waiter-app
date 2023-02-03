import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { PencilSquareIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import { getTips, setTips } from "../features/tipsSlice";

const Tip = ({ tip }) => {
  const tips = useSelector(getTips);
  const dispatch = useDispatch();

  const pressed = () => {
    dispatch(
      setTips(
        tips.map((tipD) =>
          tipD.id === tip.id
            ? { ...tipD, isPressed: !tip.isPressed }
            : { ...tipD, isPressed: false }
        )
      )
    );
  };

  return (
    <TouchableOpacity
      className={`border  p-3 rounded-xl ${
        tip.isPressed ? "border-green-600" : "border-gray-200"
      }`}
      onPress={pressed}
    >
      {typeof tip.value === "number" ? (
        <Text
          className={`font-bold text-xs ${tip.isPressed && "text-green-600"}`}
        >
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
          })
            .format(tip.value)
            .replace(",00", "")}
        </Text>
      ) : (
        <View className="flex-row space-x-1 items-center">
          <Text className="font-bold">{tip.value}</Text>
          <PencilSquareIcon size={16} color="green" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Tip;
