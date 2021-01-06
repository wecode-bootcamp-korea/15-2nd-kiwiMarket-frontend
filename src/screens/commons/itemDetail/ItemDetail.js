import React, { useState, useEffect } from "react";
import { StyleSheet, View, SectionList, Text, Alert } from "react-native";
import { ItemDetailHeader } from "../../../components/Headers";
import { ItemDetailFooter } from "../../../components/Footers";
import ItemImageSwiper from "./components/ItemImageSwiper";
import SellerProfile from "./components/SellerProfile";
import ItemContent from "./components/ItemContent";
import ListHeader from "./components/ListHeader";
import ShortItemCard from "../../../components/ShortItemCard";
import styled from "styled-components/native";
import { IMAGE_SIZE, FIXED_FOOTER_HEIGHT } from "../../../constants/Layout";
import {
  ITEM_DETAIL_API,
  SELLER_ITEMS_API,
  ITEM_LIST_API,
} from "../../../config";
import { LoadingContainer } from "../../../styles/mixin";
import LoadingKiwi from "../../../components/LoadingKiwi";
import { smallCardViewArrayGenerator } from "../../../utils";
import { useSelector } from "react-redux";

const ItemDetail = ({ navigation, route: { params } }) => {
  const [isReady, setIsReady] = useState(false);
  const [whiteHeader, setWhiteHeader] = useState(false);
  const [section, setSection] = useState([
    {
      title: [`${"판매자"}님의 판매 상품`, "더보기"],
      data: ["loading"],
    },
    {
      title: [`이건 어때요?`, ""],
      data: ["loading"],
    },
  ]);
  const [productDetail, setProductDetail] = useState([]);
  const myCategory = useSelector((state) => state.category);

  useEffect(() => {
    //아래와 같이 비동기를 순차적으로 부르지 말고
    // isReady ? !isSellerItemsReady && getSellerData() : getItemDetailData();
    // isSellerItemsReady && getRecommendItems();
    //Promise.all을 사용하자. 로딩속도 단축뿐만 아니라 불필요한 state의 사용도 줄일 수 있다.

    const itemDetailData = getItemDetailData();
    const sellerData = getSellerData();
    const recommendData = getRecommendItems();

    Promise.all([itemDetailData, sellerData, recommendData]);
  }, []);

  const getItemDetailData = async () => {
    try {
      const response = await fetch(
        `${ITEM_DETAIL_API}${params ? params.product_id : 153}`
      );
      const result = await response.json();
      if (result.message === "NO_PRODUCT") {
        navigation.goBack();
        Alert.alert("상품이 존재하지 않아요", null, [
          {
            text: "알겠어요",
            style: "cancel",
          },
        ]);
        return;
      }
      const productDetail = await result.itemDetailData;
      setIsReady(true);
      setProductDetail(productDetail);
    } catch {
      Alert.alert("통신에 실패했어요", null, [
        {
          text: "알겠어요",
          style: "cancel",
        },
      ]);
      navigation.goBack();
    }
  };

  const getSellerData = async () => {
    try {
      const response = await fetch(
        `${SELLER_ITEMS_API}${params ? params.seller_id : 2}`
      );
      const result = await response.json();
      setSection((prevSection) => [
        {
          ...prevSection[0],
          data: smallCardViewArrayGenerator(result.sellerItemsData),
        },
        prevSection[1],
      ]);
    } catch {
      Alert.alert("판매자님의 다른 판매상품을 받아오는데 실패했어요", null, [
        {
          text: "알겠어요",
          style: "cancel",
        },
      ]);
    }
  };

  const getRecommendItems = async () => {
    try {
      const response = await fetch(`${ITEM_LIST_API}?address_id=1644`, {
        headers: {
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.6z94I8H6yIH0fUo4G1WRbQy1PnpNI-rjg0963jkVxDw",
        },
      });
      const result = await response.json();
      setSection((prevSection) => [
        prevSection[0],
        {
          ...prevSection[1],
          data: smallCardViewArrayGenerator(result.productList),
        },
      ]);
    } catch {
      Alert.alert("관련 상품을 받아오는데 실패했어요", null, [
        {
          text: "알겠어요",
          style: "cancel",
        },
      ]);
    }
  };

  const goItemDetail = (
    product_id = 153,
    seller_id = productDetail[0].sellerdata.seller_id
  ) =>
    navigation.push("ItemDetail", {
      product_id: product_id,
      seller_id: seller_id,
    });
  const goBack = () => navigation.goBack();

  const handleScroll = (e) => {
    const scrollY = e.nativeEvent.contentOffset.y;
    const thresholdY = IMAGE_SIZE.itemDetailHeight * 0.8;
    whiteHeader && scrollY < thresholdY && setWhiteHeader(false);
    !whiteHeader && scrollY > thresholdY && setWhiteHeader(true);
  };

  return !isReady ? (
    <LoadingView>
      <LoadingKiwi />
    </LoadingView>
  ) : (
    <ItemDetailContainer>
      <ItemDetailHeader goBack={goBack} whiteHeader={whiteHeader} />
      <SectionList
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item, index) => index}
        sections={section}
        renderItem={({ item }) => {
          return item === "loading" ? (
            <View style={styles.kiwiSmallLoading}>
              <LoadingKiwi />
            </View>
          ) : (
            <View style={styles.flexRow}>
              <ShortItemCard goItemDetail={goItemDetail} data={item[0]} />
              {item[1].title && (
                <ShortItemCard goItemDetail={goItemDetail} data={item[1]} />
              )}
            </View>
          );
        }}
        renderSectionHeader={SectionHeader}
        ListHeaderComponent={HeaderComponent(productDetail)}
        ListFooterComponent={<EmptyFooterMargin />}
      />
      <ItemDetailFooter price={productDetail[0]?.productdetail.price} />
    </ItemDetailContainer>
  );
};

const HeaderComponent = (data = null) => {
  return (
    <>
      <ItemImageSwiper data={data[0]?.productdetail.imgSrcList} />
      <SellerProfile data={data[0]?.sellerdata} />
      <ItemContent data={data[0]?.productdetail} />
      <ListHeader
        content={{
          left: `댓글 ${data[0]?.productdetail.commentCount}`,
          right: "모든 댓글 보기",
        }}
      />
    </>
  );
};

const SectionHeader = ({ section: { title } }) => (
  <ListHeader content={{ left: title[0], right: title[1] }} noBorder={true} />
);

export default ItemDetail;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
  },
  kiwiSmallLoading: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  loadingImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
});

const ItemDetailContainer = styled.View`
  align-items: center;
  background-color: white;
`;

const EmptyFooterMargin = styled.View`
  height: ${FIXED_FOOTER_HEIGHT};
`;

const LoadingView = styled.View`
  ${LoadingContainer}
`;
