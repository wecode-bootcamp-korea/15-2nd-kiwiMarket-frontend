import React from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";

const UsedTrading = ({ route }) => {
  return (
    <View style={{ backgroundColor: "#A0C95E", flex: 1 }}>
      <Text>Used Trading</Text>
      <Button title="go to ItemList" onPress={route.goItemList} />
      <Button title="go to ItemDetail" onPress={route.goItemDetail} />
    </View>
  );
};

export default UsedTrading;
