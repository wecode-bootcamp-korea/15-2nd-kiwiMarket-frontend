import React from "react";
import { Text, View, Image, Pressable, StyleSheet } from "react-native";
import { flexCenter, kiwiButton } from "../../../styles/mixin";
import styled from "styled-components/native";
import { windowWidth } from "../../../constants/Layout";

const Intro = ({ navigation }) => {
  const goLogin = () => {
    navigation.push("Login");
  };

  return (
    <Container>
      <Image
        resizeMode="center"
        source={require("../../../assets/kiwiIntro.jpg")}
      />
      <Text style={styles.head}>우리 동네 중고 직거래 키위 마켓</Text>
      <Text style={styles.content}>키위 마켓은 동네 직거래 마켓이에요</Text>
      <Text style={styles.contentBottom}>내 동네를 설정하고 시작해보세요!</Text>
      <StartButton onPress={goLogin}>
        <StartText>내 동네 설정하고 시작하기</StartText>
      </StartButton>
    </Container>
  );
};

export default Intro;

const styles = StyleSheet.create({
  head: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  content: {
    fontSize: 18,
    paddingTop: 4,
    paddingBottom: 4,
  },
  contentBottom: {
    fontSize: 18,
    marginBottom: 32,
  },
});

const StartButton = styled.Pressable`
  ${kiwiButton}
  width: ${windowWidth * 0.9}px;
  height: 56px;
  margin-bottom: 200px;
  border-radius: 8px;
`;

const Container = styled.View`
  ${flexCenter}
  background-color: #fff;
`;

const StartText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
`;
