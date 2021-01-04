import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { PostItemHeader } from "../../../components/Headers";
import AddImagesView from "../../../components/AddImagesView";
import TitleInput from "./components/TitleInput";
import PriceInput from "./components/PriceInput";
import CategorySelectButton from "./components/CategorySelectButton";
import MainTextInput from "./components/MainTextInput";
import { POSTITEM_API } from "../../../config";
import axios from "axios";

const PostItem = ({ navigation, route }) => {
  const { type } = route.params;
  const [image, setImage] = useState([]);
  const [body, setBody] = useState({
    order_status: "판매중",
    category: "",
    title: "",
    price: "",
    description: "",
    access_range: 1,
  });

  useEffect(() => {
    // 테스트용 추후 삭제
    console.log(body);
  }, [body]);

  const goCategorySelectPage = () => {
    navigation.push("CategorySelectPage", { updateData });
  };

  const updateImage = (image) => {
    setImage(image);
  };

  const updateData = (data) => {
    setBody({ ...body, [data.type]: data.value });
  };

  const createFormData = (images, body) => {
    const data = new FormData();

    images.forEach((el) => {
      data.append("product_image", {
        uri: el.uri.replace("file://", ""),
        type: el.type,
      });
    });

    Object.keys(body).forEach((key) => data.append(key, body[key]));

    console.log(data); // 벡엔드에서 데이터 잘 받는지 확인후 제거

    return data;
  };

  const handleUploadPhoto = () => {
    const isCorrect =
      body.title.length > 0 &&
      body.price.length > 0 &&
      body.description.length > 0 &&
      image.length > 0;

    isCorrect
      ? axios
          .post(
            `${POSTITEM_API}/product/productupload/1769`,
            createFormData(image, body)
          )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
          })
          .then(Alert.alert("알림", `${type}에 글쓰기 완료`), [
            { text: "닫기" },
          ])
      : alert("nono");
  };

  return (
    <>
      <PostItemHeader
        type={type}
        goBack={navigation.goBack}
        handleUploadPhoto={handleUploadPhoto}
      />
      <View style={styles.container}>
        <AddImagesView updateImage={updateImage} />
        <TitleInput updateData={updateData} />
        <CategorySelectButton
          selectedCategroy={body.category}
          updateData={updateData}
          goCategorySelectPage={goCategorySelectPage}
        />
        <PriceInput updateData={updateData} />
        <MainTextInput updateData={updateData} />
      </View>
    </>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
});
