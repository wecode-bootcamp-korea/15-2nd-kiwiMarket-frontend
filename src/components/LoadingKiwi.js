import React, { useEffect, useState } from "react";
import { Text, View, Image, Animated, StyleSheet, Easing } from "react-native";
import styled from "styled-components/native";
import { flexCenter } from "../styles/mixin";

const LoadingKiwi = () => {
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "3600deg"],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 10000,
        easing: Easing.ease,
        useNativeDriver: true,
      })
    ).start();
  });

  return (
    <Animated.Image
      source={require("../assets/smallKiwi.png")}
      style={{ ...styles.loadingImage, transform: [{ rotate: spin }] }}
    />
  );
};

export default LoadingKiwi;

const styles = StyleSheet.create({
  loadingImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
});
