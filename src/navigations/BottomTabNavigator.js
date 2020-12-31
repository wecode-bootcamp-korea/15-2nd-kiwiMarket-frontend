import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, StyleSheet } from "react-native";
import HomeNavigator from "./HomeNavigator";
import Community from "../screens/tabs/community/Community";
import Nearby from "../screens/tabs/nearby/Nearby";
import Chat from "../screens/tabs/chat/Chat";
import MyPage from "../screens/tabs/myPage/MyPage";
import { Ionicons, Fontisto } from "react-native-vector-icons";

const Tabs = createBottomTabNavigator();

const TAB_ICON_MAP = {
  Home: { iconName: "home", tabName: "홈" },
  Community: { iconName: "document-text", tabName: "동네생활" },
  Nearby: { iconName: "location", tabName: "내 근처" },
  Chat: { iconName: "md-chatbubbles", tabName: "채팅" },
  MyPage: { iconName: "person", tabName: "나의 키위" },
};

const BottomTabNavigator = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let iconName = TAB_ICON_MAP[route.name].iconName;
        let tabName = TAB_ICON_MAP[route.name].tabName;
        return (
          <>
            <Ionicons
              name={focused ? iconName : iconName + "-outline"}
              color={focused ? "black" : "black"}
              size={22}
            />
            <Text style={styles.tabName}>{tabName}</Text>
          </>
        );
      },
    })}
    tabBarOptions={{
      showLabel: false,
      style: {
        paddingTop: 8,
        backgroundColor: "white",
        borderTopColor: "#777777",
      },
    }}
  >
    <Tabs.Screen name="Home" component={HomeNavigator} />
    <Tabs.Screen name="Community" component={Community} />
    <Tabs.Screen name="Nearby" component={Nearby} />
    <Tabs.Screen name="Chat" component={Chat} />
    <Tabs.Screen name="MyPage" component={MyPage} />
  </Tabs.Navigator>
);

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabName: {
    fontSize: 12,
    marginTop: 4,
  },
});
