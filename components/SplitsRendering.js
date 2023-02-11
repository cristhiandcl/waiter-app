import { View, Text } from "react-native";
import React, { useMemo, useState } from "react";

const SplitsRendering = ({ split, index }) => {
  const [groupItemsInSplit, setGroupItemsInSplit] = useState();

  useMemo(() => {
    const itemsArranged = [...split];
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

    setGroupItemsInSplit(groupAllItems);
  }, []);

  return (
    <View className="flex-row">
      <View className="flex-1 mb-2">
        <Text className="">Split {index + 1}</Text>
        <View className="my-1">
          {groupItemsInSplit?.map((spl) => (
            <View className="flex-row flex-1 space-x-1">
              <Text className="text-[10rem] font-extrabold">{spl[0].name}</Text>
              <Text className="text-[10rem] font-extrabold">x{spl.length}</Text>
            </View>
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
        {groupItemsInSplit?.map((spl) => (
          <Text className="text-[10rem] font-extrabold text-right">
            {new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
            })
              .format(spl[0].price)
              .replace(",00", "")}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default SplitsRendering;
