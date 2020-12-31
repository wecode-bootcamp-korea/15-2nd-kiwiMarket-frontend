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
import { LoginHeader } from "../../components/Headers";
import styled from "styled-components/native";
import { flexRowMarginXView, longKiwiButton } from "../../styles/mixin";
import { PHONE_AUTH_API, AUTH_CHECK_API } from "../../config";
import { AsyncStorage } from "react-native";

const PHONE_NUMBER_LENGTH = 11;
const AUTH_NUMBER_LENGTH = 6;

const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authNumber, setAuthNumber] = useState("");
  const [focusPhoneNum, setFocusPhoneNum] = useState(false);
  const [focusAuthNum, setFocusAuthNum] = useState(false);
  const [showAuthView, setShowAuthView] = useState(false);
  const [onValidating, setOnValidating] = useState(false);

  const goBack = () => navigation.pop();

  const getAuthNum = async () => {
    try {
      const response = await fetch(PHONE_AUTH_API, {
        method: "POST",
        body: JSON.stringify({
          phone_number: phoneNumber,
        }),
      });
      const result = await response.json();
    } catch {
      alert("서버가 자고 있어요");
    }
  };

  const validateAuthNum = async () => {
    try {
      setOnValidating(true);
      const response = await fetch(AUTH_CHECK_API, {
        method: "POST",
        body: JSON.stringify({
          phone_number: phoneNumber,
          auth_number: authNumber,
        }),
      });
      const result = await response.json();
      if (result.message === "SIGNUP") {
        navigation.push("SignUp", { phoneNumber: phoneNumber });
      } else if (result.message === "SIGNIN") {
        alert("이미 가입된 회원입니다. 로그인 시켜줄게요!");
        AsyncStorage.setItem("data", result.token);
        Keyboard.dismiss();
        setOnValidating(false);
        navigation.replace("BottomTabNavigator");
      } else if (result.message === "DENY") {
        setOnValidating(false);
        alert("잘못된 인증번호 입니다.");
      } else {
        alert("버그 발견");
      }
    } catch {}
  };

  const onPressValidateAuthNumber = () => {
    Keyboard.dismiss();
    Alert.alert(
      "어떻게 하실래요?",
      null,
      [
        {
          text: "서버를 기다려보자",
          onPress: () => validateAuthNum(),
          style: "cancel",
        },
        {
          text: "지금은 테스트 중이야. 그냥 넘어가자",
          onPress: () => {
            navigation.push("SignUp", { phoneNumber: phoneNumber });
            return;
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Container onPress={Keyboard.dismiss}>
      <LoginHeader goBack={goBack} />
      <LoginContainer>
        <View style={styles.introContainer}>
          <Image
            style={styles.introImage}
            source={require("../../assets/cute-lock.jpg")}
          />
          <View>
            <Text style={styles.intro}>키위마켓은 휴대폰 번호로 가입해요</Text>
            <Text style={styles.intro}>
              번호는 <Text style={styles.bold}>안전하게 보관</Text> 되며
            </Text>
            <Text style={styles.intro}>어디에도 공개되지 않아요</Text>
          </View>
        </View>
        <PhoneNumberInput
          style={focusPhoneNum && styles.focused}
          value={phoneNumber}
          placeholder="전화번호를 입력해주세요"
          maxLength={PHONE_NUMBER_LENGTH}
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
          textContentType="telephoneNumber"
          keyboardType="number-pad"
          selectionColor={"#A0C95E"}
          onFocus={() => setFocusPhoneNum(true)}
          onBlur={() => setFocusPhoneNum(false)}
        />
        <GetAuthNumber
          validPhoneNumber={phoneNumber.length === PHONE_NUMBER_LENGTH}
          disabled={phoneNumber.length !== PHONE_NUMBER_LENGTH}
          onPress={() => {
            getAuthNum();
            setShowAuthView(true);
          }}
        >
          <Text style={styles.getAuthNum}>{`${
            showAuthView ? "인증문자를 다시 받고 싶어요" : "인증문자 받기"
          }`}</Text>
        </GetAuthNumber>
      </LoginContainer>
      <AuthContainer style={!showAuthView && styles.hide}>
        <PhoneNumberInput
          style={focusAuthNum && styles.focused}
          placeholder="인증번호 6자리 숫자"
          value={authNumber}
          maxLength={AUTH_NUMBER_LENGTH}
          onChangeText={(authNumber) => setAuthNumber(authNumber)}
          textContentType="telephoneNumber"
          keyboardType="number-pad"
          selectionColor={"#A0C95E"}
          onFocus={() => setFocusAuthNum(true)}
          onBlur={() => setFocusAuthNum(false)}
        />
        <Text style={styles.warning}>
          어떤 경우에도 타인에게 공유하지 마세요!
        </Text>
        <GetAuthNumber
          validPhoneNumber={authNumber.length === AUTH_NUMBER_LENGTH}
          disabled={authNumber.length !== AUTH_NUMBER_LENGTH}
          onPress={onPressValidateAuthNumber}
        >
          <Text style={styles.getAuthNum}>
            {onValidating ? "인증을 기다리는 중입니다." : "인증하기"}
          </Text>
        </GetAuthNumber>
      </AuthContainer>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  hide: {
    display: "none",
  },
  bold: {
    fontWeight: "800",
  },
  intro: {
    fontSize: 16,
  },
  warning: {
    color: "#777777",
    marginBottom: 24,
  },
  introImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginRight: 16,
  },
  introContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  getAuthNum: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  focused: {
    borderColor: "#A0C95E",
  },
  snackBar: {
    marginBottom: 500,
    zIndex: 400,
  },
});

const Container = styled.Pressable`
  flex: 1;
  background-color: white;
`;

const LoginContainer = styled.View`
  ${flexRowMarginXView}
  flex-direction: column;
  align-items: flex-start;
  border-bottom-color: white;
`;

const AuthContainer = styled.View`
  ${flexRowMarginXView}
  flex-direction: column;
  align-items: flex-start;
  border-bottom-color: white;
`;

const PhoneNumberInput = styled.TextInput`
  ${longKiwiButton}
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  margin-bottom: 16px;
  padding: 0 8px;
  font-size: 16px;
`;

const GetAuthNumber = styled.TouchableOpacity`
  ${longKiwiButton}
  background-color: ${({ theme }) => theme.colors.gray};
  ${(props) => props.validPhoneNumber && `background-color: #A0C95E`};
`;
