import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const ModifyOrderScreen = () => {
  const {
    params: { id },
  } = useRoute();
  console.log(id);
  return (
    <View>
      <Text>ModifyOrderScreen</Text>
    </View>
  );
};

export default ModifyOrderScreen;
