import React from "react";
import LongCardList from "../../../components/LongCardList";

const ItemList = ({ navigation }) => {
  const goItemDetail = (product_id, seller_id) => {
    navigation.push("ItemDetail", {
      product_id: product_id,
      seller_id: seller_id,
    });
  };

  return <LongCardList goItemDetail={goItemDetail} />;
};

export default ItemList;
