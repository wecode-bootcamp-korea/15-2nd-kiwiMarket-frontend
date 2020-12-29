import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "../ItemList";
import { HomeHeader } from "../../components/Headers";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  return (
    <>
      <HomeHeader></HomeHeader>
      <View style={styles.container}>
        <Button
          title="go to SetMyTown"
          onPress={() => {
            navigation.push("SetMyTown");
          }}
        />
        <Button
          title="go to InterestedCategory"
          onPress={() => navigation.push("InterestedCategory")}
        />
        <Button
          title="go to HomeSearch"
          onPress={() => navigation.push("HomeSearch")}
        />
      </View>
      <ItemList route={{ navigation }} />
      <Button
        title="go to PostItem, type: Nearby"
        onPress={() =>
          navigation.push("PostItem", {
            type: "Nearby",
          })
        }
      />
      <Button
        title="go to PostItem, type: UsedTrading"
        onPress={() =>
          navigation.push("PostItem", {
            type: "UsedTrading",
          })
        }
      />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
