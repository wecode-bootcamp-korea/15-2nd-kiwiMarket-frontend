import React, { useState, useEffect } from "react";
import { windowWidth } from "../../../../constants/Layout";
import styled from "styled-components/native";

const inputWidth = windowWidth - 32;

const TitleInput = ({ updateData }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    updateData({ type: "name", value: title });
  }, [title]);

  return (
    <TilteTextInput
      onChangeText={(title) => setTitle(title)}
      value={title}
      placeholder="글 제목"
    />
  );
};

export default TitleInput;

const TilteTextInput = styled.TextInput`
  height: 69px;
  width: ${inputWidth}px;
  border-bottom-color: ${({ theme }) => theme.colors.gray};
  border-bottom-width: 1px;
  font-size: 17px;
`;
