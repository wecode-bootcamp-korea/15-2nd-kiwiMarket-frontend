import styled from "styled-components/native";
import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Ionicons } from "react-native-vector-icons";

export const HomeHeader = () => {
  return (
    <HeaderContainer>
      <HeaderText>홈 헤더</HeaderText>
      <Text>아이콘들</Text>
    </HeaderContainer>
  );
};

export const ItemDetailHeader = ({ goBack, whiteHeader }) => {
  const color = whiteHeader ? "black" : "white";

  return (
    <ItemDetailHeaderContainer style={whiteHeader && styles.whiteHeader}>
      <Ionicons name="arrow-back" size={22} color={color} onPress={goBack} />
      <Icons>
        <Ionicons name="share-outline" size={22} color={color} />
        <Ionicons name="ios-ellipsis-vertical" size={22} color={color} />
      </Icons>
    </ItemDetailHeaderContainer>
  );
};

const styles = StyleSheet.create({
  whiteHeader: {
    backgroundColor: "white",
    borderBottomColor: "#dadada",
    borderBottomWidth: 1,
  },
});

const HeaderContainer = styled.View`
  height: 88px;
  padding: ${({ theme: { paddings } }) =>
    `${paddings.headerTop} ${paddings.base} ${paddings.small}`};

  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  width: 100%;
`;

const ItemDetailHeaderContainer = styled(HeaderContainer)`
  background-color: transparent;
  border: none;
  position: absolute;
  top: 0;
  z-index: 1;
`;

const Icons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60px;
`;

const HeaderText = styled.Text`
  font-size: 18px;
`;
