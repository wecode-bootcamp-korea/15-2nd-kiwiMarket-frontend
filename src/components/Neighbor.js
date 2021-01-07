import React from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import styled from "styled-components/native";
import { flexRowMarginXView } from "../styles/mixin";

const Neighbor = () => (
  <Container>
    <InnerContainer>
      <Text>Neighbor</Text>
    </InnerContainer>
  </Container>
);

export default Neighbor;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const InnerContainer = styled.View`
  ${flexRowMarginXView}
  background-color: white;
  border-bottom-color: white;
`;
