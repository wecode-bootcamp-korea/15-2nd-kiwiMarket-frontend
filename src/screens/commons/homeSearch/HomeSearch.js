import React from "react";
import { Text, Dimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import TownInfo from "../../../components/TownInfo";
import Neighbor from "../../../components/Neighbor";
import UsedTrading from "../../../components/UsedTrading";

const initialLayout = { width: Dimensions.get("window").width };

const HomeSearch = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "first",
      title: "중고거래",
      goItemList() {
        navigation.push("ItemList");
      },
      goItemDetail() {
        navigation.push("ItemDetail");
      },
    },
    { key: "second", title: "동네정보" },
    { key: "third", title: "사람" },
  ]);

  const renderScene = SceneMap({
    first: UsedTrading,
    second: TownInfo,
    third: Neighbor,
  });

  const goItemDetail = () => {
    navigation.push("ItemDetail");
  };

  return (
    <>
      <Text style={{ height: 80 }}>Header 자리</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </>
  );
};

export default HomeSearch;
