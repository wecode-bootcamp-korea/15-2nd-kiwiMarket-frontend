import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, AsyncStorage } from "react-native";
import { InterestedCategoryHeader } from "../../../components/Headers";
import styled from "styled-components/native";
import CategoryPicker from "../../../components/CategoryPicker";
import { flexRowMarginXView } from "../../../styles/mixin";
import { useSelector } from "react-redux";
import { UPDATE_INTERESTED_CATEGORY_API } from "../../../config";

const InterestedCategory = ({ navigation }) => {
  const goBack = () => navigation.goBack();
  const categories = useSelector((state) => state.category);

  // useEffect를 활용해서 업데이트된 리덕스 category 상태를 백엔드에 주어야 한다.
  // useEffect(() => {
  //   return updateInterestedCategory;
  // }, [categories]);

  return (
    <View style={styles.container}>
      <InterestedCategoryHeader goBack={goBack} />
      <GuideCategoryList>
        <GuideText>홈 화면에서 보고 싶지 않은 카테고리는</GuideText>
        <GuideText>체크를 해제하세요</GuideText>
        <SmallText>최소 1개 이상 선택되어 있어야 합니다.</SmallText>
      </GuideCategoryList>
      <CategoryContainer>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => {
            return (
              <CategoryPicker categoryName={item.title} categoryId={index} />
            );
          }}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </CategoryContainer>
    </View>
  );
};

export default InterestedCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
});

const GuideCategoryList = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
`;

const GuideText = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
`;

const CategoryContainer = styled.View`
  ${flexRowMarginXView}
  border-bottom-color: white;
  justify-content: space-between;
`;

const SmallText = styled.Text`
  margin-top: 32px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.smallTextGray};
`;
