import React from "react";
import { Image, View, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { IMAGE_SIZE } from "../../../../constants/Layout";

const ItemImageSwiper = ({ data = [] }) => {
  return (
    <Swiper
      height={IMAGE_SIZE.itemDetailHeight}
      dot={<View style={styles.dot} />}
      activeDot={<View style={styles.activeDot} />}
      loop={false}
    >
      {data.map((item, idx) => (
        <View style={styles.slide} key={idx}>
          <Image
            style={styles.image}
            source={{
              uri: item,
            }}
          />
        </View>
      ))}
    </Swiper>
  );
};

export default ItemImageSwiper;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  dot: {
    backgroundColor: "rgba(255,255,255,.5)",
    width: 7,
    height: 7,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },

  activeDot: {
    backgroundColor: "#FFF",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },

  image: {
    width: IMAGE_SIZE.itemDetailWidth,
    height: IMAGE_SIZE.itemDetailHeight,
  },
});
