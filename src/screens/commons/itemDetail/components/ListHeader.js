import React from "react";
import { Text, View, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { windowWidth } from "../../../../constants/Layout";
import { flexRowMarginXView } from "../../../../styles/mixin";

const ListHeader = ({ content, noBorder }) => (
  <BottomBorderViewRow style={noBorder && { borderBottomColor: "transparent" }}>
    <View style={styles.flexRow}>
      <LeftText>{content.left}</LeftText>
      <RightText>{content.right}</RightText>
    </View>
  </BottomBorderViewRow>
);

export default ListHeader;

const styles = StyleSheet.create({
  flexRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const BottomBorderViewRow = styled.View`
  ${flexRowMarginXView}
`;

const MarginText = styled.Text`
  margin: 8px 0;
`;
const LeftText = styled(MarginText)`
  font-size: 16px;
  font-weight: 600;
`;
const RightText = styled(LeftText)`
  color: ${({ theme }) => theme.colors.smallTextGray};
`;
