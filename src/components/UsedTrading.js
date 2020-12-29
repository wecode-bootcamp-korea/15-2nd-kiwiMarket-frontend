import React from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";

const UsedTrading = ({ route }) => {
  return (
    <View style={{ backgroundColor: "#A0C95E", flex: 1 }}>
      <Text>Used Trading</Text>
      <Button
        title="go to ItemList"
        onPress={() => route.navigation.push("ItemList")}
      />
      <Button
        title="go to ItemDetail"
        onPress={() => route.navigation.push("ItemDetail")}
      />
    </View>
  );
};

export default UsedTrading;
