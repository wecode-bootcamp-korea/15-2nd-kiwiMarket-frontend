import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const Nearby = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Nearby</Text>
    <Button
      title="go to detail"
      onPress={() => navigation.navigate("ItemDetail")}
    ></Button>
  </View>
);

export default Nearby;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
