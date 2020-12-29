import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import ItemDetail from "../screens/ItemDetail";
import InterestedCategory from "../screens/InterestedCategory";
import HomeSearch from "../screens/HomeSearch";
import SetMyTown from "../screens/SetMyTown";
import SearchMyLocation from "../screens/SearchMyLocation";
import ItemList from "../screens/ItemList";
import PostItem from "../screens/PostItem";

const Stack = createStackNavigator();

export default function KiwiNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* 로딩, 회원가입 스크린 */}
      {/* ex) 내동네 설정 스크린 거의 무한스크롤 지역 선택 스크린: 로그인 할 때 +  */}
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen name="InterestedCategory" component={InterestedCategory} />
      <Stack.Screen name="HomeSearch" component={HomeSearch} />
      <Stack.Screen name="ItemList" component={ItemList} />
      <Stack.Screen name="ItemDetail" component={ItemDetail} />
      <Stack.Screen name="SetMyTown" component={SetMyTown} />
      <Stack.Screen name="PostItem" component={PostItem} />
      <Stack.Screen name="SearchMyLocation" component={SearchMyLocation} />
    </Stack.Navigator>
  );
}

// Modal : options={{gestureEnabled: false}}
