import React from "react";
import { Text, View, Button, StyleSheet, Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;

const InterestedCategory = ({ params }) => (
  <View style={styles.container}>
    <Text>InterestedCategory</Text>
  </View>
);

export default InterestedCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
