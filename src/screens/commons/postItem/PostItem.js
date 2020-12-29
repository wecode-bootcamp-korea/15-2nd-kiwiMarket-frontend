import React from "react";
import { Text, View, StyleSheet } from "react-native";

const PostItem = ({ route }) => {
  const { type } = route.params;

  return (
    <View style={styles.container}>
      <Text>{`PostItem: ${type}`}</Text>
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
