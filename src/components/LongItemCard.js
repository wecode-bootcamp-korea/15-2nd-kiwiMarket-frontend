import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { EvilIcons } from "react-native-vector-icons";

const windowHeight = Dimensions.get("window").height;

const LongItemCard = ({ item, goItemDetail }) => {
  return (
    <ItemCardWrap onPress={goItemDetail}>
      <ImageWrap
        source={{
          uri: item.imgSrc,
        }}
      />
      <CardTextView>
        <ProductText fontSize={16}>{item.title}</ProductText>
        <ProductText
          color={({ theme }) => theme.colors.smallTextGray}
        >{`${item.townName} · ${item.postedTime}`}</ProductText>
        <ProductText fontSize={14} fontWeight={600}>
          {item.price.toLocaleString()}원
        </ProductText>
        <CountText>
          {item.commentCount > 0 ? (
            <>
              <EvilIcons name="comment" size={19} color="gray" />
              <ProductText
                color={({ theme }) => theme.colors.smallTextGray}
                fontSize={14}
              >
                {item.commentCount}
              </ProductText>
            </>
          ) : null}
          {item.wishCount > 0 ? (
            <>
              <EvilIcons name="heart" size={19} color="gray" />
              <ProductText
                color={({ theme }) => theme.colors.smallTextGray}
                fontSize={14}
              >
                {item.wishCount}
              </ProductText>
            </>
          ) : null}
        </CountText>
      </CardTextView>
    </ItemCardWrap>
  );
};

export default LongItemCard;

const CardTextView = styled.View`
  flex: 1;
`;

const CountText = styled.Text`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const ItemCardWrap = styled.Pressable`
  width: 100%;
  flex-direction: row;
  background-color: #fff;
  padding: ${({ theme }) => theme.paddings.base} 0;
  border-bottom-color: ${({ theme }) => theme.colors.gray};
  border-bottom-width: 1px;
`;

const ImageWrap = styled.Image`
  width: ${windowHeight * 0.13}px;
  height: ${windowHeight * 0.13}px;
  margin-right: 16px;
  border-radius: 5px;
`;

const ProductText = styled.Text.attrs((props) => ({
  fontSize: props.fontSize || "12",
  fontWeight: props.fontWeight || "normal",
  color: props.color || "black",
}))`
  font-size: ${(props) => props.fontSize}px;
  margin-bottom: 4px;
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
`;
