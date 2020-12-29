import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/tabs/home/Home";
import InterestedCategory from "../screens/commons/interestedCategory/InterestedCategory";

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="InterestedCategory" component={InterestedCategory} />
  </Stack.Navigator>
);

export default HomeNavigator;
