import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const ItemDetail = ({ navigation }) => (
  <View style={styles.container}>
    <Text>ItemDetail</Text>
    <Button
      title="Go to ItemDetail"
      onPress={() => navigation.push("ItemDetail")}
    ></Button>
  </View>
);

export default ItemDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
