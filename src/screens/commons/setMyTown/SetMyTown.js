import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { SetMyTownHeader } from "../../../components/Headers";

const SetMyTown = ({ navigation }) => {
  return (
    <>
      <SetMyTownHeader goBack={navigation.goBack} />
      <View style={styles.container}>
        <Text>SetMyTown</Text>
        <Button
          title="go to SearchMyLocation"
          onPress={() => navigation.push("SearchMyLocation")}
        />
      </View>
    </>
  );
};

export default SetMyTown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
