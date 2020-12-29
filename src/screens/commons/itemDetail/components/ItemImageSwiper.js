import React from "react";
import { Image, View, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { IMAGE_SIZE } from "../../../../constants/Layout";

const mockImages = [
  "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2489&q=80",
  "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1240&q=80",
  "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
  "https://images.unsplash.com/photo-1584208123923-cc027813cbcb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1434&q=80",
];

const ItemImageSwiper = ({ params }) => (
  <Swiper
    height={IMAGE_SIZE.itemDetailHeight}
    dot={<View style={styles.dot} />}
    activeDot={<View style={styles.activeDot} />}
    loop={false}
  >
    {[1, 2, 3, 4].map((item, idx) => (
      <View style={styles.slide} key={idx}>
        <Image
          style={styles.image}
          source={{
            uri: mockImages[idx],
          }}
        />
      </View>
    ))}
  </Swiper>
);

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
