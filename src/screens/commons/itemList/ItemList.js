import React from "react";
import LongCardList from "../../../components/LongCardList";

const ItemList = ({ navigation }) => {
  const goItemDetail = () => navigation.push("ItemDetail");

  return <LongCardList goItemDetail={goItemDetail} />;
};

export default ItemList;
