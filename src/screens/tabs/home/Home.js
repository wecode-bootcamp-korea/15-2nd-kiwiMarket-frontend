import React from "react";
import { StyleSheet, View } from "react-native";
import LongCardList from "../../../components/LongCardList";
import { HomeHeader } from "../../../components/Headers";
import BottomModalButton from "../../../components/BottomModalButton";

const Home = ({ navigation }) => {
  const goItemDetail = () => navigation.push("ItemDetail");
  const goScreen = (page) => navigation.push(page);

  const goPostItem = (type) => {
    navigation.push("PostItem", {
      type: type,
    });
  };

  return (
    <View style={styles.container}>
      <HomeHeader goScreen={goScreen} />
      <LongCardList goItemDetail={goItemDetail} />
      <BottomModalButton goPostItem={goPostItem} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
