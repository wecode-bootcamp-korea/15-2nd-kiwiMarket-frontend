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

const SellerProfile = ({ data = {} }) => {
  const [color, setColor] = useState(MANNER_TEMP_MAP[0].color);
  const [progress, setProgress] = useState(0.5);
  const [emoji, setEmoji] = useState(MANNER_TEMP_MAP[0].emoji);

  const setMannerState = (level) => {
    setColor(MANNER_TEMP_MAP[level].color);
    setProgress(tempToProgress(data.mannerTemperature));
    setEmoji(MANNER_TEMP_MAP[level].emoji);
  };

  const setManner = () => {
    if (data.mannerTemperature > 40) setMannerState(2);
    else if (data.mannerTemperature < 32) setMannerState(0);
    else setMannerState(1);
  };

  useEffect(() => {
    data.mannerTemperature && setManner();
  }, [data]);

  return (
    <BottomBorderViewRow>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <Profile
          source={{
            uri:
              data.seller_profilepic === "사진 데이터가 없음"
                ? "https://www.societegenerale.lu/typo3temp/assets/_processed_/0/6/csm_default-profile_ffd6e2872a.png"
                : data.seller_profilepic,
          }}
        />
        <View style={styles.sellerInfo}>
          <Text style={styles.sellerId}>{data.seller}</Text>
          <Text style={styles.sellerTown}>{data.townName}</Text>
        </View>
      </View>
      <View style={styles.mannerBox}>
        <View style={styles.flexRow}>
          <View style={styles.flexEnd}>
            <TempText color={color}>{`${
              data.mannerTemperature || 0
            } °C`}</TempText>
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
