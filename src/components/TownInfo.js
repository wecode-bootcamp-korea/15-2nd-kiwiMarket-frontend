import React from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import styled from "styled-components/native";
import { flexRowMarginXView } from "../styles/mixin";

const TownInfo = () => (
  <Container>
    <InnerContainer>
      <Text>TownInfo</Text>
    </InnerContainer>
  </Container>
);

export default TownInfo;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const InnerContainer = styled.View`
  ${flexRowMarginXView}
  background-color: white;
  border-bottom-color: white;
`;
