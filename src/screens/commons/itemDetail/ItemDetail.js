import React, { useState, useEffect } from "react";
import { StyleSheet, View, SectionList, Text } from "react-native";
import { ItemDetailHeader } from "../../../components/Headers";
import { ItemDetailFooter } from "../../../components/Footers";
import ItemImageSwiper from "./components/ItemImageSwiper";
import UserProfile from "./components/SellerProfile";
import ItemContent from "./components/ItemContent";
import ListHeader from "./components/ListHeader";
import ShortItemCard from "../../../components/ShortItemCard";
import styled from "styled-components/native";
import { IMAGE_SIZE, FIXED_FOOTER_HEIGHT } from "../../../constants/Layout";
import { mockData1, mockData2 } from "../../../data/ItemDetailMock";
import { data } from "../../../data/ItemDetailRealMock";
import {
  ITEM_DETAIL_API,
  SELLER_ITEMS_API,
  ITEM_LIST_API,
} from "../../../config";
import { flexCenter, LoadingContainer } from "../../../styles/mixin";
import LoadingKiwi from "../../../components/LoadingKiwi";
import { smallCardViewArrayGenerator } from "../../../utils";

const HeaderComponent = (data = null) => {
  return (
    <>
      <ItemImageSwiper
        data={data.productdetail && data.productdetail[0].imgSrcList}
      />
      <UserProfile data={data.sellerdata && data.sellerdata[0]} />
      <ItemContent data={data.productdetail && data.productdetail[0]} />
      <ListHeader
        content={{
          left: `댓글 ${
            data.productdetail && data.productdetail[0].commentCount
          }`,
          right: "모든 댓글 보기",
        }}
      />
    </>
  );
};

const SectionHeader = ({ section: { title } }) => (
  <ListHeader content={{ left: title[0], right: title[1] }} noBorder={true} />
);

const ItemDetail = ({ navigation, route }) => {
  const { product_id } = route.params;
  const [isReady, setIsReady] = useState(false);
  const [isSellerItemsReady, setIsSellerItemsReady] = useState(false);
  const [isRecommendItemsReady, setIsRecommendItemsReady] = useState(false);
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

  useEffect(() => {
    isReady ? !isSellerItemsReady && getSellerData() : getData();
    isSellerItemsReady && getRecommendItems();
    // 아래는 목데이터 사용
    //setProductDetail(data.itemDetailData);
  }, [isReady, isSellerItemsReady]);

  const getData = async () => {
    const response = await fetch(`${ITEM_DETAIL_API}/25`);
    const result = await response.json();
    const productDetail = await result.itemDetailData;
    setIsReady(true);
    setProductDetail(productDetail);
  };

  const getSellerData = async () => {
    const response = await fetch(`${SELLER_ITEMS_API}/4`);
    const result = await response.json();

    setSection([
      {
        ...section[0],
        data: smallCardViewArrayGenerator(result.sellerItemsData),
      },
      {
        title: [`이건 어때요?`, ""],
        data: ["loading"],
      },
    ]);
    setIsSellerItemsReady(true);
  };

  const getRecommendItems = async () => {
    const response = await fetch(`${ITEM_LIST_API}/1817`);
    const result = await response.json();
    setSection([
      section[0],
      {
        title: [`이건 어때요?`, ""],
        data: smallCardViewArrayGenerator(result.productList),
      },
    ]);
    setIsRecommendItemsReady(true);
  };

  const goItemDetail = () => navigation.push("ItemDetail", { id: 1 });
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
      <ItemDetailFooter
        price={
          productDetail.productdetail && productDetail.productdetail[0].price
        }
      />
    </ItemDetailContainer>
  );
};

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
