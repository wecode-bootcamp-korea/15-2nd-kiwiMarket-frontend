import React from "react";
import styled from "styled-components/native";
import { windowWidth } from "../../../../constants/Layout";
import { AntDesign } from "react-native-vector-icons";
import { useSelector } from "react-redux";

const inputWidth = windowWidth - 32;

const CategorySelectButton = ({ goCategorySelectPage }) => {
  const postCategory = useSelector((state) => state.postCategory).title;

  return (
    <CategoryPressable onPress={goCategorySelectPage}>
      <CategoryText>{postCategory}</CategoryText>
      <AntDesign name="right" size={12} color="black" />
    </CategoryPressable>
  );
};

export default CategorySelectButton;

const CategoryPressable = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 69px;
  width: ${inputWidth}px;
  border-bottom-color: ${({ theme }) => theme.colors.gray};
  border-bottom-width: 1px;
  padding-right: 8px;
`;

const CategoryText = styled.Text`
  font-size: 17px;
`;
