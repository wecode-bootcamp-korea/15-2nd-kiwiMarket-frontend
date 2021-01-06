import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import LongItemCard from "./LongItemCard";
import { ITEM_LIST_API } from "../config";
import LoadingKiwi from "../components/LoadingKiwi";
import { windowHeight } from "../constants/Layout";
import { AsyncStorage } from "react-native";

const LongCardList = ({ goItemDetail, addressId }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const myToken = await AsyncStorage.getItem("token");

    await fetch(`${ITEM_LIST_API}?address_id=${addressId}`, {
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.6z94I8H6yIH0fUo4G1WRbQy1PnpNI-rjg0963jkVxDw",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setData(result.productList);
      });
  };

  return data.length > 0 ? (
    <ItemListContainer
      data={data}
      keyExtractor={(item) => `${item.itemId}`}
      renderItem={({ item }) => (
        <LongItemCard goItemDetail={goItemDetail} item={item} />
      )}
    />
  ) : (
    <LoadingView>
      <LoadingKiwi />
    </LoadingView>
  );
};

export default LongCardList;

const ItemListContainer = styled.FlatList`
  background-color: #fff;
  padding: ${({ theme }) => theme.paddings.base};
`;

const LoadingView = styled.View`
  justify-content: center;
  align-items: center;
  height: ${windowHeight - 180}px;
`;
