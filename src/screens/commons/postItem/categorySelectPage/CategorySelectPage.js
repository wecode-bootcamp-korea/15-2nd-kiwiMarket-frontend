import React from "react";
import styled from "styled-components/native";
import { CategorySelectHeader } from "../../../../components/Headers";

const categorySelectPage = ({ navigation, route }) => {
  const selectCategory = (category) => {
    route.params.updateData({ type: "category", value: category });
    navigation.goBack();
  };

  return (
    <>
      <CategorySelectHeader goBack={navigation.goBack} />
      <CategoryFlat
        style={{ backgroundColor: "white" }}
        data={CATEGORIES}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item }) => (
          <SelectButton onPress={() => selectCategory(item)}>
            <CategoryText>{item}</CategoryText>
          </SelectButton>
        )}
      />
    </>
  );
};

export default categorySelectPage;

const CategoryFlat = styled.FlatList`
  background-color: white;
`;

const SelectButton = styled.Pressable`
  justify-content: center;
  height: 45px;
  border-bottom-color: ${({ theme }) => theme.colors.gray};
  border-bottom-width: 1px;
  padding-left: 16px;
`;
const CategoryText = styled.Text`
  font-size: 15px;
  font-weight: 300;
`;
const CATEGORIES = [
  "디지털/가전",
  "가구/인테리어",
  "유아동/유아도서",
  "생활/가공식품",
  "스포츠/레저",
  "여성잡화",
  "여성의류",
  "남성패션/잡화",
  "게임/취미",
  "뷰티/미용",
  "반려동물용품",
  "도서/티켓/음반",
  "식물",
  "기타 중고물품",
  "삽니다",
];
