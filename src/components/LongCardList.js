import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import LongItemCard from "./LongItemCard";
import { productList } from "../data/productList";

const LongCardList = ({ goItemDetail }) => {
  //   const [data, setData] = useState([]);
  //   useEffect(() => {
  //     fetch("https://jsonplaceholder.typicode.com/users")
  //       .then((response) => response.json())
  //       .then((result) => setData(result));
  //   }, []);
  //   data.length > 0 && console.log(data);
  // API 통신 후 사용 예정
  return (
    <ItemListContainer
      data={productList}
      keyExtractor={(item) => item.itemId}
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
