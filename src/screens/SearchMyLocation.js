import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

const SearchMyLocation = ({ params }) => (
  <View style={styles.container}>
    <Text>SearchMyLocation</Text>
  </View>
);

export default SearchMyLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
