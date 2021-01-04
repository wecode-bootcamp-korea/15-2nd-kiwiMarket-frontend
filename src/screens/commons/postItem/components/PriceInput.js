import React, { useState, useEffect } from "react";
import { windowWidth } from "../../../../constants/Layout";
import styled from "styled-components/native";
import { FontAwesome } from "react-native-vector-icons";

const inputWidth = windowWidth - 32;

const PriceInput = ({ updateData }) => {
  const [price, setPrice] = useState("");

  useEffect(() => {
    updateData({ type: "price", value: price });
  }, [price]);

  return (
    <PriceInputContainer>
      <FontAwesome name="won" size={15} color={price ? "black" : "#DEDDDD"} />
      <PriceTextInput
        onChangeText={(price) =>
          price.length > 8 ? setPrice("99999999") : setPrice(price)
        }
        value={price}
        placeholder="가격 입력"
        keyboardType="number-pad"
        maxLength={9}
      />
    </PriceInputContainer>
  );
};

export default PriceInput;

const PriceInputContainer = styled.View`
  width: ${inputWidth}px;
  flex-direction: row;
  align-items: center;
  border-bottom-color: ${({ theme }) => theme.colors.gray};
  border-bottom-width: 1px;
`;

const PriceTextInput = styled.TextInput`
  height: 69px;
  min-width: ${inputWidth - 16}px;
  margin-left: 4px;
  font-size: 17px;
`;
