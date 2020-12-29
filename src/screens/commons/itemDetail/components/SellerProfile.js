import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { windowWidth } from "../../../../constants/Layout";
import { AntDesign } from "react-native-vector-icons";
import ProgressBar from "react-native-progress/Bar";
import { tempToProgress } from "../../../../utils";
import { flexRowMarginXView } from "../../../../styles/mixin";

const MANNER_TEMP_MAP = [
  { color: "#777777", emoji: "frowno" },
  { color: "#A0C95E", emoji: "meh" },
  { color: "#FF9933", emoji: "smileo" },
];

const SellerProfile = () => {
  const [mannerTemp, setMannerTemp] = useState(10);
  const [color, setColor] = useState("#A0C95E");
  const [progress, setProgress] = useState(0.5);
  const [emoji, setEmoji] = useState("meh");

  const setMannerState = (level) => {
    setColor(MANNER_TEMP_MAP[level].color);
    setProgress(tempToProgress(mannerTemp));
    setEmoji(MANNER_TEMP_MAP[level].emoji);
  };

  useEffect(() => {
    if (mannerTemp > 40) setMannerState(2);
    else if (mannerTemp < 32) setMannerState(0);
    else setMannerState(1);
  }, [mannerTemp]);

  return (
    <BottomBorderViewRow>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <Profile
          source={{
            uri:
              "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
          }}
        />
        <View style={styles.sellerInfo}>
          <Text style={styles.sellerId}>하태하태</Text>
          <Text style={styles.sellerTown}>대현동</Text>
        </View>
      </View>
      <View style={styles.mannerBox}>
        <View style={styles.flexRow}>
          <View style={styles.flexEnd}>
            <TempText color={color}>{`${mannerTemp} °C`}</TempText>
            <ProgressBar
              color={color}
              progress={progress}
              width={44}
              height={4}
              unfilledColor={"#EAEAEA"}
              borderWidth={0}
            />
          </View>
          <AntDesign name={emoji} size={24} color={color} />
        </View>
        <View>
          <SmallText>매너온도</SmallText>
        </View>
      </View>
    </BottomBorderViewRow>
  );
};

export default SellerProfile;

const styles = StyleSheet.create({
  sellerInfo: {
    flex: 1,
    height: 32,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  sellerId: {
    fontWeight: "600",
  },

  sellerTown: {
    fontSize: 12,
    marginTop: 8,
  },

  mannerBox: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 40,
  },

  flexRow: {
    flexDirection: "row",
  },

  flexEnd: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginRight: 8,
  },
});

const BottomBorderViewRow = styled.View`
  ${flexRowMarginXView}
`;

const Profile = styled.Image`
  width: 42px;
  height: 42px;
  margin-right: 8px;
  border-radius: 50px;
`;

const SmallText = styled.Text`
  font-size: 12px;
  font-weight: 200;
  color: ${({ theme }) => theme.colors.smallTextGray};
`;

const TempText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.color};
`;
