import styled from "styled-components/native";
import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import {
  Ionicons,
  Fontisto,
  Feather,
  AntDesign,
} from "react-native-vector-icons";
import { useDispatch } from "react-redux";
import { initCategory } from "../redux/actions";
import { windowWidth } from "../constants/Layout";
import { useSelector } from "react-redux";
import { UPDATE_INTERESTED_CATEGORY_API } from "../config";

export const HomeHeader = ({ goScreen, addressName }) => {
  return (
    <HomeHeaderContainer>
      <HeaderLeftButton
        onPress={() => {
          goScreen("SetMyTown");
        }}
      >
        {addressName ? addressName : null}
      </HeaderLeftButton>
      <HeaderIcons>
        <Fontisto
          name="search"
          size={18}
          color="black"
          onPress={() => {
            goScreen("HomeSearch");
          }}
        />
        <Fontisto
          name="justify"
          size={18}
          color="black"
          onPress={() => {
            goScreen("InterestedCategory");
          }}
        />
        <Fontisto name="bell" size={18} color="black" />
      </HeaderIcons>
    </HomeHeaderContainer>
  );
};

export const ItemDetailHeader = ({ goBack, whiteHeader }) => {
  const color = whiteHeader ? "black" : "white";

  return (
    <ItemDetailHeaderContainer style={whiteHeader && styles.whiteHeader}>
      <Ionicons name="arrow-back" size={22} color={color} onPress={goBack} />
      <Icons>
        <Ionicons name="share-outline" size={22} color={color} />
        <Ionicons name="ios-ellipsis-vertical" size={22} color={color} />
      </Icons>
    </ItemDetailHeaderContainer>
  );
};

export const LoginHeader = ({ goBack }) => {
  return (
    <HeaderContainer>
      <HeaderLeftButton style={styles.fixedWidth} onPress={goBack}>
        <Ionicons name="arrow-back" size={22} onPress={goBack} />
      </HeaderLeftButton>
      <Text style={styles.headerText}>로그인/가입</Text>
      <View style={styles.fixedWidth}></View>
    </HeaderContainer>
  );
};

export const PostItemHeader = ({ type, goBack, handleUploadPhoto }) => {
  const dispatch = useDispatch();
  return (
    <PostItemHeaderContainer>
      <Pressable
        onPress={() => {
          goBack();
          dispatch(initCategory());
        }}
      >
        <PostItemHeaderText>닫기</PostItemHeaderText>
      </Pressable>
      <PostItemHeaderTilte>{type} 글쓰기</PostItemHeaderTilte>
      <Pressable onPress={handleUploadPhoto}>
        <PostItemHeaderText>완료</PostItemHeaderText>
      </Pressable>
    </PostItemHeaderContainer>
  );
};

export const CategorySelectHeader = ({ goBack }) => {
  return (
    <PostItemHeaderContainer>
      <Pressable onPress={goBack}>
        <PostItemHeaderText>
          <Feather name="arrow-left" size={22} color="black" />
        </PostItemHeaderText>
      </Pressable>
      <PostItemHeaderTilte>카테고리 선택</PostItemHeaderTilte>
      <Pressable>
        <CategorySelectHeaderText>완료</CategorySelectHeaderText>
      </Pressable>
    </PostItemHeaderContainer>
  );
};

export const InterestedCategoryHeader = ({ goBack }) => {
  const categories = useSelector((state) => state.category);

  const updateInterestedCategory = async () => {
    const response = await fetch(`${UPDATE_INTERESTED_CATEGORY_API}`, {
      method: "POST",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.6z94I8H6yIH0fUo4G1WRbQy1PnpNI-rjg0963jkVxDw",
      },
      body: JSON.stringify({
        category: categories
          .filter((category) => category.checked)
          .map((category) => category.id),
      }),
    });
    const result = await response.json();
  };

  return (
    <HeaderContainer>
      <HeaderLeftButton style={styles.fixedWidth}>
        <Ionicons
          name="arrow-back"
          size={22}
          onPress={() => {
            updateInterestedCategory();
            goBack();
          }}
        />
      </HeaderLeftButton>
      <Text style={styles.headerText}>관심 카테고리 설정</Text>
      <View style={styles.fixedWidth}></View>
    </HeaderContainer>
  );
};

export const HomeSearchHeader = ({ goBack, setFocusInput }) => {
  return (
    <HeaderContainer>
      <HeaderLeftButton style={styles.goBack} onPress={goBack}>
        <Ionicons name="arrow-back" size={22} onPress={goBack} />
      </HeaderLeftButton>
      <HomeSearchInput
        placeholder="검색어를 입력해주세요"
        style={styles.search}
        onFocus={() => setFocusInput(true)}
        onBlur={() => setFocusInput(false)}
      />
    </HeaderContainer>
  );
};

export const SetMyTownHeader = ({ goBack }) => {
  return (
    <PostItemHeaderContainer>
      <Pressable onPress={goBack}>
        <PostItemHeaderText>
          <AntDesign name="close" size={22} color="black" />
        </PostItemHeaderText>
      </Pressable>
      <PostItemHeaderTilte>내 동네 설정하기</PostItemHeaderTilte>
      <Pressable>
        <CategorySelectHeaderText>완료</CategorySelectHeaderText>
      </Pressable>
    </PostItemHeaderContainer>
  );
};

const styles = StyleSheet.create({
  whiteHeader: {
    backgroundColor: "white",
    borderBottomColor: "#dadada",
    borderBottomWidth: 1,
  },
  fixedWidth: {
    width: 50,
  },
  goBack: {
    width: 32,
  },
  headerText: {
    fontSize: 18,
  },
});

const HeaderContainer = styled.View`
  height: 88px;
  padding: ${({ theme: { paddings } }) =>
    `${paddings.headerTop} ${paddings.base} ${paddings.small}`};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  width: 100%;
`;

const ItemDetailHeaderContainer = styled(HeaderContainer)`
  background-color: transparent;
  border: none;
  position: absolute;
  top: 0;
  z-index: 1;
`;

const Icons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60px;
`;

const HomeHeaderContainer = styled(HeaderContainer)`
  top: 0;
  z-index: 1;
`;

const HeaderLeftButton = styled.Text`
  font-size: 18px;
`;

const HeaderIcons = styled.View`
  width: 80px;
  flex-direction: row;
  justify-content: space-between;
`;

const PostItemHeaderContainer = styled(HeaderContainer)``;

const PostItemHeaderText = styled.Text`
  font-size: 16px;
`;

const PostItemHeaderTilte = styled(PostItemHeaderText)`
  font-weight: 700;
`;

const CategorySelectHeaderText = styled.Text`
  font-size: 16px;
  color: white;
`;

const HomeSearchInput = styled.TextInput`
  width: ${windowWidth * 0.8}px;
  height: 32px;
  padding: 0 8px;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  font-size: 16px;
`;
