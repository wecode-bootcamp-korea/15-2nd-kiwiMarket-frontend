import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Intro from "../screens/commons/Intro/Intro";
import Login from "../screens/login/Login";
import SignUp from "../screens/signup/SignUp";

const Stack = createStackNavigator();

const LoginNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Intro" component={Intro} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

export default LoginNavigator;
