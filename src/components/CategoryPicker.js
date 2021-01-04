import React from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { windowWidth } from "../constants/Layout";
import { Ionicons } from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "../redux/actions";

const CategoryPicker = ({ categoryName, categoryId }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);

  const toggleInterestedCategory = () => {
    dispatch(toggleCategory(categoryId));
    console.log("toggler!");
  };

  return (
    <Container onPress={toggleInterestedCategory}>
      <Ionicons
        style={styles.checkIcon}
        name={`checkmark-circle${
          categories[categoryId].checked ? "" : "-outline"
        }`}
        size={24}
        color={categories[categoryId].checked ? "#A0C95E" : "#dadada"}
      />
      <CategoryName>{categoryName}</CategoryName>
    </Container>
  );
};

export default CategoryPicker;

const styles = StyleSheet.create({
  checkIcon: {
    marginRight: 16,
  },
});

const Container = styled.Pressable`
  width: ${windowWidth * 0.46}px;
  flex-direction: row;
  align-items: center;
  padding: 12px 0 12px 0;
`;

const CategoryName = styled.Text`
  font-size: 16px;
`;
