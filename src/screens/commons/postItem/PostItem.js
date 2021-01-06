import React, { useState } from "react";
import { View, StyleSheet, Alert, AsyncStorage } from "react-native";
import { PostItemHeader } from "../../../components/Headers";
import AddImagesView from "../../../components/AddImagesView";
import TitleInput from "./components/TitleInput";
import PriceInput from "./components/PriceInput";
import CategorySelectButton from "./components/CategorySelectButton";
import MainTextInput from "./components/MainTextInput";
import { ITEM_LIST_API } from "../../../config";
import { useSelector, useDispatch } from "react-redux";
import { initCategory } from "../../../redux/actions";

const PostItem = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { type, addressId } = route.params;
  const postCategory = useSelector((state) => state.postCategory).id;
  const [image, setImage] = useState([]);
  const [body, setBody] = useState({
    name: "",
    price: "",
    description: "",
    access_range: 1,
  });

  const goCategorySelectPage = () => {
    navigation.push("CategorySelectPage");
  };

  const updateImage = (image) => {
    setImage(image);
  };

  const updateData = (data) => {
    setBody({
      ...body,
      [data.type]: data.value,
    });
  };

  const createFormData = (images, body, category) => {
    const data = new FormData();

    images.forEach((el) => {
      data.append("image", {
        type: `${el.type}/${el.uri.split(".").pop()}`,
        name: el.uri.split("/").pop(),
        uri: el.uri.replace("file://", ""),
      });
    });
    Object.keys(body).forEach((key) => data.append(key, body[key]));
    data.append("product_category", category);

    return data;
  };

  const handleUploadPhoto = () => {
    const isCorrect =
      body.name.length > 0 &&
      body.price.length > 0 &&
      body.description.length > 0 &&
      image.length > 0 &&
      postCategory > 0;

    const isCorrectTrue = () => {
      Alert.alert("알림", `${type}에 글을 쓰시겠습니까?`, [
        { text: "확인", onPress: postFetch },
      ]);
    };

    const postFetch = async () => {
      navigation.goBack();
      Alert.alert("알림", "글쓰기 완료", [{ text: "닫기" }]);
      const myToken = await AsyncStorage.getItem("token");

      await fetch(`${ITEM_LIST_API}?address_id=${addressId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data;",
          Authorization: myToken,
          //"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.6z94I8H6yIH0fUo4G1WRbQy1PnpNI-rjg0963jkVxDw",
        },
        body: createFormData(image, body, postCategory),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result.message);
          if (result.message === "SUCCESS") dispatch(initCategory());
          else Alert.alert("알림", "글쓰기 실패", [{ text: "닫기" }]);
        });
    };

    isCorrect
      ? isCorrectTrue()
      : Alert.alert("알림", `모든 칸을 작성해주세요.`, [
          {
            text: "닫기",
            style: "cancel",
          },
        ]);
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
        <CategorySelectButton goCategorySelectPage={goCategorySelectPage} />
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
