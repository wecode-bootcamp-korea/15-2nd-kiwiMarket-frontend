import React from "react";
import { Text, View, Button } from "react-native";
import styled from "styled-components/native";
import { flexRowMarginXView } from "../styles/mixin";

const UsedTrading = ({ route }) => {
  return (
    <Container>
      <InnerContainer>
        <Text>Used Trading</Text>
      </InnerContainer>
    </Container>
  );
};

export default UsedTrading;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const InnerContainer = styled.View`
  ${flexRowMarginXView}
  background-color: white;
  border-bottom-color: white;
`;
