import styled from "styled-components/native";
import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

/* ----------------------------------------------------------------

수많은 헤더가 여기에 있겠지
헤더 스타일드 컴포넌트 만들어보기

----------------------------------------------------------------- */

export const HomeHeader = () => {
  return (
    <HeaderContainer>
      <HeaderText>홈 헤더</HeaderText>
      <Text>아이콘들</Text>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  height: 80px;
  padding: ${({ theme: { paddings } }) =>
    `${paddings.headerTop} ${paddings.base} ${paddings.small}`};

  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray};
`;

const HeaderText = styled.Text`
  font-size: 18px;
`;
