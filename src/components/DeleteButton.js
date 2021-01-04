import React, { useState } from "react";
import { AntDesign } from "react-native-vector-icons";
import styled from "styled-components/native";

const DeleteButton = ({ imageUri, deleteImage }) => {
  return (
    <DeleteButtonPressable onPress={() => deleteImage(imageUri)}>
      <AntDesign name="closecircle" size={16} color="black" />
    </DeleteButtonPressable>
  );
};

export default DeleteButton;

const DeleteButtonPressable = styled.Pressable`
  position: absolute;
  right: 10px;
  top: 0;
  z-index: 1;
`;
