import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

const ItemList = ({ navigation, route }) => (
  <View style={styles.container}>
    <Text>Header자리</Text>
    <Text>ItemList</Text>
    <Button
      title="go to ItemDetail"
      onPress={() =>
        navigation
          ? navigation.push("ItemDetail")
          : route.navigation.push("ItemDetail")
      }
    />
  </View>
);

export default ItemList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
