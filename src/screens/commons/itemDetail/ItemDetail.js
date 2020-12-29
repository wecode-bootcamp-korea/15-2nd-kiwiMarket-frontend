import React, { useState } from "react";
import { StyleSheet, View, SectionList } from "react-native";
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

const HeaderComponent = () => (
  <>
    <ItemImageSwiper />
    <UserProfile />
    <ItemContent />
    <ListHeader content={{ left: "댓글 0", right: "모든 댓글 보기" }} />
  </>
);

const SectionHeader = ({ section: { title } }) => (
  <ListHeader content={{ left: title[0], right: title[1] }} noBorder={true} />
);

const ItemDetail = ({ navigation }) => {
  const [whiteHeader, setWhiteHeader] = useState(false);
  const [section, setSection] = useState([
    {
      title: [`${"판매자"}님의 판매 상품`, "더보기"],
      data: mockData1,
    },
    {
      title: [`${"사용자"}님, 이건 어때요?`, ""],
      data: mockData2,
    },
  ]);
  const goItemDetail = () => navigation.push("ItemDetail", { id: 1 });
  const goBack = () => navigation.goBack();

  const handleScroll = (e) => {
    const scrollY = e.nativeEvent.contentOffset.y;
    const thresholdY = IMAGE_SIZE.itemDetailHeight * 0.8;
    whiteHeader && scrollY < thresholdY && setWhiteHeader(false);
    !whiteHeader && scrollY > thresholdY && setWhiteHeader(true);
  };

  return (
    <ItemDetailContainer>
      <ItemDetailHeader goBack={goBack} whiteHeader={whiteHeader} />
      <SectionList
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item, index) => index}
        sections={section}
        renderItem={({ item }) => (
          <View style={styles.flexRow}>
            <ShortItemCard goItemDetail={goItemDetail} imgUrl={item[0]} />
            <ShortItemCard goItemDetail={goItemDetail} imgUrl={item[1]} />
          </View>
        )}
        renderSectionHeader={SectionHeader}
        ListHeaderComponent={HeaderComponent}
        ListFooterComponent={<EmptyFooterMargin />}
      />
      <ItemDetailFooter />
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
});

const ItemDetailContainer = styled.View`
  align-items: center;
  background-color: white;
`;

const EmptyFooterMargin = styled.View`
  height: ${FIXED_FOOTER_HEIGHT};
`;
