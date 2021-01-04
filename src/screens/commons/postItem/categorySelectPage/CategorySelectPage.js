import React from "react";
import styled from "styled-components/native";
import { CategorySelectHeader } from "../../../../components/Headers";
import { useDispatch } from "react-redux";
import { selectingCategory } from "../../../../redux/actions";

const categorySelectPage = ({ navigation }) => {
  const dispatch = useDispatch();

  const selectCategory = (category) => {
    dispatch(selectingCategory(category));
    navigation.goBack();
  };

  return (
    <>
      <CategorySelectHeader goBack={navigation.goBack} />
      <CategoryFlat
        style={{ backgroundColor: "white" }}
        data={CATEGORIES}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item }) => {
          return (
            <SelectButton onPress={() => selectCategory(item)}>
              <CategoryText>{item.title}</CategoryText>
            </SelectButton>
          );
        }}
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
  { id: 1, title: "디지털/가전" },
  { id: 2, title: "가구/인테리어" },
  { id: 3, title: "유아동/유아도서" },
  { id: 4, title: "생활/가공식품" },
  { id: 5, title: "스포츠/레저" },
  { id: 6, title: "여성잡화" },
  { id: 7, title: "여성의류" },
  { id: 8, title: "남성패션/잡화" },
  { id: 9, title: "게임/취미" },
  { id: 10, title: "뷰티/미용" },
  { id: 11, title: "반려동물용품" },
  { id: 12, title: "도서/티켓/음반" },
  { id: 13, title: "식물" },
  { id: 14, title: "기타 중고물품" },
  { id: 15, title: "삽니다" },
];
