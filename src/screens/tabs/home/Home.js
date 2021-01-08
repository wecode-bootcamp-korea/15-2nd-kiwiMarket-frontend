import React, { useState, useEffect } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import LongCardList from "../../../components/LongCardList";
import { HomeHeader } from "../../../components/Headers";
import BottomModalButton from "../../../components/BottomModalButton";
import LoadingKiwi from "../../../components/LoadingKiwi";
import { windowHeight } from "../../../constants/Layout";
import styled from "styled-components/native";
import { HOST2 } from "../../../config";

const Home = ({ navigation }) => {
  const [townData, setTownData] = useState({});
  const goItemDetail = (product_id, seller_id) => {
    navigation.push("ItemDetail", {
      product_id,
      seller_id,
    });
  };

  const goScreen = (page) => navigation.push(page);

  const goPostItem = (type, addressId) => {
    navigation.push("PostItem", {
      type,
      addressId,
    });
  };

  const getUserInfo = async () => {
    const myToken = await AsyncStorage.getItem("token");
    await fetch(`${HOST2}user/myaddress`, {
      headers: {
        Authorization: myToken,
        //"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.6z94I8H6yIH0fUo4G1WRbQy1PnpNI-rjg0963jkVxDw",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setTownData(result.address_list[0]);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return townData.address_name ? (
    <View style={styles.container}>
      <HomeHeader goScreen={goScreen} addressName={townData.address_name} />
      <LongCardList goItemDetail={goItemDetail} addressId={townData.id} />
      <BottomModalButton goPostItem={goPostItem} addressId={townData.id} />
    </View>
  ) : (
    <LoadingView>
      <LoadingKiwi />
    </LoadingView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

const LoadingView = styled.View`
  justify-content: center;
  align-items: center;
  height: ${windowHeight - 180}px;
`;
