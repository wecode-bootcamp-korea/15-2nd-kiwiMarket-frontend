import React from "react";
import {
  Text,
  Dimensions,
  Keyboard,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import {
  TabView,
  SceneMap,
  Pressable,
  TouchableOpacity,
} from "react-native-tab-view";
import TownInfo from "../../../components/TownInfo";
import Neighbor from "../../../components/Neighbor";
import UsedTrading from "../../../components/UsedTrading";
import { HomeSearchHeader } from "../../../components/Headers";
import styled from "styled-components/native";

const initialLayout = { width: Dimensions.get("window").width };

const HomeSearch = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [focusInput, setFocusInput] = React.useState(false);
  const [routes, setRoutes] = React.useState([
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

  const goBack = () => {
    navigation.goBack();
  };

  const renderTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((item, i) => {
          return (
            <TabBarText onPress={() => setIndex(i)} selected={i === index}>
              {item.title}
            </TabBarText>
          );
        })}
      </View>
    );
  };

  return (
    <>
      <HomeSearchHeader goBack={goBack} setFocusInput={setFocusInput} />
      <TabView
        style={{ flex: focusInput ? 0 : 1 }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        onPress={() => Keyboard.dismiss()}
      />
      <SearchHistoryContainer
        onPress={() => {
          Keyboard.dismiss();
          setFocusInput(false);
        }}
        focusInput={focusInput}
      >
        <FlatList />
      </SearchHistoryContainer>
    </>
  );
};

export default HomeSearch;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  tabItem: {
    borderBottomColor: "black",
  },
});

const SearchHistoryContainer = styled.Pressable`
  flex: 1;
  display: ${(props) => (props.focusInput ? "flex" : "none")};
`;

const TabBarText = styled.Text`
  flex: 1;
  align-items: center;
  padding: 16px;
  text-align: center;
  color: ${(props) => (props.selected ? "black" : "#777777")};
  font-weight: ${(props) => (props.selected ? "600" : "400")};
`;
