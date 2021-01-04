import React, { useState, useEffect } from "react";
import { Text, Platform, FlatList, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "react-native-vector-icons";
import DeleteButton from "./DeleteButton";
import styled from "styled-components/native";

const AddImagesView = ({ updateImage }) => {
  const [image, setImage] = useState([]);

  useEffect(() => {
    image.length > 0 && updateImage(image);
  }, [image]);

  const deleteImage = (imageUri) => {
    setImage(image.filter((item) => item.uri !== imageUri));
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    if (image.length < 10) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(
          image.concat({
            uri: result.uri,
            type: `${result.type}/${result.uri.split(".").pop()}`,
          })
        );
      }
    } else {
      Alert.alert("알림", "이미지는 최대 10장 까지 첨부할 수 있어요", [
        { text: "닫기" },
      ]);
    }
  };

  return (
    <AddImagesViewContainer>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={image}
        keyExtractor={(_, index) => `${index}`}
        ListHeaderComponent={
          <AddImagesButton onPress={pickImage}>
            <Entypo name="camera" size={25} color="darkgray" />
            <Text>{image.length}/10</Text>
          </AddImagesButton>
        }
        renderItem={({ item }) => (
          <ImageContainer>
            <DeleteButton imageUri={item.uri} deleteImage={deleteImage} />
            <ImageBox source={{ uri: item.uri }} />
          </ImageContainer>
        )}
        horizontal={true}
      />
    </AddImagesViewContainer>
  );
};

export default AddImagesView;

const AddImagesViewContainer = styled.View`
  flex-direction: row;
  margin-top: 28px;
  border-bottom-color: ${({ theme }) => theme.colors.gray};
  border-bottom-width: 1px;
  padding-bottom: 16px;
`;

const AddImagesButton = styled.Pressable`
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 64px;
  height: 64px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  margin-top: 6px;
  margin-right: 12px;
`;

const ImageContainer = styled.View`
  position: relative;
  padding: 6px;
`;

const ImageBox = styled.Image`
  width: 64px;
  height: 64px;
  margin-right: 6px;
  border-radius: 4px;
`;
