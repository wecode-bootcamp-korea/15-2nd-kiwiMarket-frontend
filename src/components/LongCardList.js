import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import LongItemCard from "./LongItemCard";
import { productList } from "../data/productList";
import { POSTITEM_API } from "../config";

const LongCardList = ({ goItemDetail }) => {
  const [data, setData] = useState([...productList]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch(`${POSTITEM_API}/product/1817`)
      .then((response) => response.json())
      .then((result) => setData(result.productList));
  };

  return (
    <ItemListContainer
      data={data}
      keyExtractor={(item) => `${item.itemId}`}
      renderItem={({ item }) => (
        <LongItemCard goItemDetail={goItemDetail} item={item} />
      )}
    />
  );
};

export default LongCardList;

const ItemListContainer = styled.FlatList`
  background-color: #fff;
  padding: ${({ theme }) => theme.paddings.base};
`;
