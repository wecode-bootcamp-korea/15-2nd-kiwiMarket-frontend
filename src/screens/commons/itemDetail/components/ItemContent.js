import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { windowWidth } from "../../../../constants/Layout";
import { flexRowMarginXView } from "../../../../styles/mixin";

const ItemContent = ({ data = {} }) => {
  return (
    <BottomBorderViewCol>
      <ContentTitle>{data.title}</ContentTitle>
      <ContentSmall>{data.category}</ContentSmall>
      <Content>{data.description}</Content>
      <ContentSmall>{`댓글 ${data.commentCount} · 관심 ${data.wishCount} · 조회 ${data.hits}`}</ContentSmall>
    </BottomBorderViewCol>
  );
};

export default ItemContent;

const BottomBorderViewRow = styled.View`
  ${flexRowMarginXView}
`;

const BottomBorderViewCol = styled(BottomBorderViewRow)`
  flex-direction: column;
  align-items: flex-start;
`;

const MarginText = styled.Text`
  margin: 8px 0;
`;
const ContentTitle = styled(MarginText)`
  font-size: 20px;
  font-weight: 600;
`;
const Content = styled(MarginText)`
  font-size: 16px;
`;
const ContentSmall = styled(MarginText)`
  font-size: 12px;
  font-weight: 200;
  color: ${({ theme }) => theme.colors.smallTextGray};
`;
