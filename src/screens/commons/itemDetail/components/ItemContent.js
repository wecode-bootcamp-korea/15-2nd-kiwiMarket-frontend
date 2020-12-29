import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { windowWidth } from "../../../../constants/Layout";
import { flexRowMarginXView } from "../../../../styles/mixin";

const ItemContent = ({ params }) => (
  <BottomBorderViewCol>
    <ContentTitle>고오급 시계</ContentTitle>
    <ContentSmall>남성패션/잡화 · 어제</ContentSmall>
    <Content>
      {
        "상태 좋아요 상태 좋아요 상태 좋아요 상태 좋아요 상태 좋아요 상태 좋아요"
      }
    </Content>
    <ContentSmall>댓글 2 · 관심 1 · 조회 42</ContentSmall>
  </BottomBorderViewCol>
);

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
