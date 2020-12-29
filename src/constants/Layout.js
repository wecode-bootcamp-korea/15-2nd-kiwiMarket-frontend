import { Dimensions } from "react-native";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
export const IMAGE_SIZE = {
  shortCardWidth: windowWidth * 0.44,
  shortCardHeight: windowWidth * 0.34,
  itemDetailWidth: windowWidth,
  itemDetailHeight: windowHeight * 0.5,
};
export const FIXED_FOOTER_HEIGHT = "120px";
export const FOOTER_BUTTON = windowWidth * 0.4;
