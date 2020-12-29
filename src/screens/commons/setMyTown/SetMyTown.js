import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

const SetMyTown = ({ navigation }) => (
  <View style={styles.container}>
    <Text>SetMyTown</Text>
    <Button
      title="go to SearchMyLocation"
      onPress={() => navigation.push("SearchMyLocation")}
    />
  </View>
);

export default SetMyTown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
