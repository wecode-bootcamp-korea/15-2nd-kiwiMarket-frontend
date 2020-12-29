import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { FIXED_FOOTER_HEIGHT, FOOTER_BUTTON } from "../constants/Layout";
import { Ionicons } from "react-native-vector-icons";

export const ItemDetailFooter = ({ params }) => {
  const [wish, setWish] = React.useState(null);

  const pressWish = () => {
    setWish(!wish);
  };

  return (
    <FooterFixed>
      <View style={styles.flexRow}>
        <Ionicons
          name={`ios-heart-${wish ? "outline" : "sharp"}`}
          size={26}
          color={`${wish ? "#777777" : "#A0C95E"}`}
          onPress={pressWish}
        />
        <View style={styles.priceView}>
          <Text style={styles.price}>3,000원</Text>
        </View>
      </View>
      <CommentButton>
        <Text style={styles.whiteText}>채팅으로 거래하기</Text>
      </CommentButton>
    </FooterFixed>
  );
};

const styles = StyleSheet.create({
  whiteText: {
    color: "white",
    fontWeight: "800",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceView: {
    justifyContent: "center",
    paddingLeft: 16,
    marginLeft: 16,
    height: 40,
    borderLeftColor: "#777777",
    borderLeftWidth: 1,
  },
  price: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

const FooterFixed = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  height: ${FIXED_FOOTER_HEIGHT};
  width: 100%;
  padding: 0 16px 30px 16px;
  border-top-color: ${({ theme }) => theme.colors.gray};
  border-top-width: 1px;
  background-color: white;
  z-index: 1;
`;

const CommentButton = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${FOOTER_BUTTON}px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.kiwi};
  border-radius: 4px;
`;
