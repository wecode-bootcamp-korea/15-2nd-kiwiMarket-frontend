import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  Keyboard,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import CurrentMapView from "../../components/CurrentMapView";
import { LoginHeader } from "../../components/Headers";
import styled from "styled-components/native";
import { flexRowMarginXView, longKiwiButton } from "../../styles/mixin";
import {
  SIGN_UP_API,
  VALIDATE_NICKNAME_API,
  KIWI_REST_API_KEY,
} from "../../config";
import { AsyncStorage } from "react-native";

const MAX_NICKNAME_LENGTH = 20;

const SignUp = ({ navigation, route }) => {
  const { phoneNumber = "" } = route.params;
  const [nickname, setNickname] = useState("");
  const [focusNickname, setFocusNickname] = useState(false);
  const [checkNickname, setCheckNickname] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [myTown, setMyTown] = useState("동내를 인증해주세요!");
  const [townCode, setTownCode] = useState("");
  const [coordinate, setCoordinate] = useState();

  const goBack = () => navigation.pop();

  const getCurrentLocation = async () => {
    setMyTown("동내 인증중...");
    const { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      Alert("현재 위치에 대한 정보를 받아 오고싶키위🥝");
      return;
    }
    const myLocation = await Location.getCurrentPositionAsync({});
    setCoordinate({
      latitude: myLocation.coords.latitude,
      longitude: myLocation.coords.longitude,
    });
    const townName = await getTownName([
      myLocation.coords.latitude,
      myLocation.coords.longitude,
    ]);

    setMyTown(townName);
  };

  const getTownName = async (coordinate) => {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${coordinate[1]}&y=${coordinate[0]}`,
      {
        method: "GET",
        headers: {
          Authorization: `KakaoAK ${KIWI_REST_API_KEY}`,
        },
      }
    );
    const result = await response.json();

    // [0]: 법정동, [1]: 행정동
    setTownCode(result.documents[0].code);
    return result.documents[0].address_name;
  };

  const resetNicknameState = () => {
    setNickname("");
    setCheckNickname(false);
    setIsValidNickname(false);
  };

  const TrySignUp = async () => {
    try {
      const response = await fetch(SIGN_UP_API, {
        method: "POST",
        body: JSON.stringify({
          phone_number: phoneNumber,
          address_code: townCode,
          nickname: nickname,
          email: "",
        }),
      });
      const result = await response.json();
      if (result.message === "SUCCESS") {
        AsyncStorage.setItem("token", result.token);
        navigation.replace("BottomTabNavigator");
        alert("가입해 주셔서 감사합니다!");
      } else if (result.message === "DUPLICATED_NICKNAME") {
        alert("중복된 닉네임 입니다");
        resetNicknameState();
      } else {
        alert(result.message);
      }
    } catch {}
  };

  const onPressValidateNickname = () => {
    Keyboard.dismiss();
    if (isValidNickname) {
      resetNicknameState();
    } else {
      Alert.alert(
        "어떻게 하실래요?",
        null,
        [
          {
            text: "서버를 기다려보자",
            onPress: () => {
              validateNickname();
              setCheckNickname(true);
            },
            style: "cancel",
          },
          {
            text: "지금은 테스트 중이야. 그냥 넘어가자",
            onPress: () => {
              setCheckNickname(true);
              setIsValidNickname(true);
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const onPressSignUp = () => {
    Alert.alert(
      "어떻게 하실래요?",
      null,
      [
        {
          text: "서버랑 통신해서 가입!",
          onPress: () => {
            TrySignUp();
          },
          style: "cancel",
        },
        {
          text: "지금은 테스트 중이야. 일단 넘어가자",
          onPress: () => {
            navigation.replace("BottomTabNavigator");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const validateNickname = async () => {
    try {
      const response = await fetch(VALIDATE_NICKNAME_API, {
        method: "POST",
        body: JSON.stringify({
          nickname: nickname,
        }),
      });
      const result = await response.json();
      if (result.message === "SUCCESS") {
        alert("사용 가능한 닉네임입니다.");
        setIsValidNickname(true);
      } else {
        resetNicknameState();
        alert("닉네임이 중복됩니다.");
      }
    } catch {}
  };

  const message = (msg = "") => {
    if (msg === "duplicated") return "중복된 닉네임입니다.";

    return checkNickname
      ? isValidNickname
        ? "다른 닉네임을 하고 싶어요"
        : "닉네임 중복 확인 중입니다..."
      : "닉네임 중복 확인";
  };

  return (
    <Container onPress={Keyboard.dismiss}>
      <LoginHeader goBack={goBack} />
      <SignUpContainer>
        <Text style={styles.smallTitle}>내 동네</Text>
        <Text style={styles.location}>{myTown}</Text>
        <GetMyTown onPress={getCurrentLocation}>
          <Text style={styles.buttonText}>
            {townCode ? "인증 완료!" : "내 동네 인증하기"}
          </Text>
        </GetMyTown>
        <CurrentMapView coordinate={coordinate} />
        <View style={!townCode && styles.hide}>
          <Text style={styles.smallTitle}>닉네임</Text>
          <NicknameInput
            style={focusNickname && styles.focused}
            value={nickname}
            maxLength={MAX_NICKNAME_LENGTH}
            onChangeText={(nickname) => setNickname(nickname)}
            textContentType="nickname"
            selectionColor={"#A0C95E"}
            onFocus={() => setFocusNickname(true)}
            onBlur={() => setFocusNickname(false)}
          />
          <ValidateNicknameButton
            validPhoneNumber={!isValidNickname && nickname.length >= 1}
            disabled={nickname.length < 1}
            onPress={onPressValidateNickname}
          >
            <Text style={styles.buttonText}>{message()}</Text>
          </ValidateNicknameButton>
          <ValidateNicknameButton
            validPhoneNumber={isValidNickname}
            disabled={!isValidNickname}
            onPress={onPressSignUp}
          >
            <Text style={styles.buttonText}>
              {isValidNickname
                ? "키위마켓 바로 시작하기!"
                : "닉네임 중복을 확인해주세요"}
            </Text>
          </ValidateNicknameButton>
        </View>
      </SignUpContainer>
    </Container>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  hide: {
    display: "none",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  focused: {
    borderColor: "#A0C95E",
  },
  smallTitle: {
    fontSize: 16,
    color: "#777777",
    marginLeft: 4,
    marginBottom: 8,
  },
  location: {
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 20,
    fontWeight: "600",
  },
});

const Container = styled.Pressable`
  flex: 1;
  background-color: white;
`;

const SignUpContainer = styled.View`
  ${flexRowMarginXView}
  flex-direction: column;
  align-items: flex-start;
  border-bottom-color: white;
`;

const NicknameInput = styled.TextInput`
  ${longKiwiButton}
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  margin-bottom: 16px;
  padding: 0 8px;
  font-size: 16px;
`;

const ValidateNicknameButton = styled.TouchableOpacity`
  ${longKiwiButton}
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.gray};
  ${(props) => props.validPhoneNumber && `background-color: #A0C95E`};
`;

const GetMyTown = styled.TouchableOpacity`
  ${longKiwiButton}
  margin-bottom: 16px;
`;
