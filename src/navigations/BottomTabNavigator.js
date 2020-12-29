import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import Community from "../screens/tabs/community/Community";
import Nearby from "../screens/tabs/nearby/Nearby";
import Chat from "../screens/tabs/chat/Chat";
import MyPage from "../screens/tabs/myPage/MyPage";

const Tabs = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeNavigator} />
    <Tabs.Screen name="Community" component={Community} />
    <Tabs.Screen name="Nearby" component={Nearby} />
    <Tabs.Screen name="Chat" component={Chat} />
    <Tabs.Screen name="MyPage" component={MyPage} />
  </Tabs.Navigator>
);

export default BottomTabNavigator;
