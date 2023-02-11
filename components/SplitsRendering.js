import { View, Text } from "react-native";
import React from "react";

const SplitsRendering = ({ split, index }) => {
  return (
    <View className="flex-row">
      <View className="flex-1 mb-2">
        <Text className="">Split {index + 1}</Text>
        <View className="my-1">
          {split.map((spl) => (
            <Text className="text-[10rem] font-extrabold flex-1">
              {spl.name}
            </Text>
          ))}
        </View>
      </View>
      <View>
        <Text>
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
          })
            .format(split.reduce((prev, item) => prev + item.price, 0))
            .replace(",00", "")}
        </Text>
        {split.map((spl) => (
          <Text className="text-[10rem] font-extrabold text-right">
            {new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
            })
              .format(spl.price)
              .replace(",00", "")}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default SplitsRendering;
