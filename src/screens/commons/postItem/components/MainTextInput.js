import React, { useState, useEffect } from "react";
import { windowWidth } from "../../../../constants/Layout";
import styled from "styled-components/native";

const DescriptionInput = ({ updateData }) => {
  const [mainText, setMainText] = useState("");

  useEffect(() => {
    updateData({ type: "description", value: mainText });
  }, [mainText]);

  return (
    <DescriptionTextInput
      onChangeText={(mainText) => setMainText(mainText)}
      value={mainText}
      placeholder="본문 내용을 입력해주세요."
      multiline={true}
      maxLength={50}
    />
  );
};

export default DescriptionInput;

const DescriptionTextInput = styled.TextInput`
  min-height: 120px;
  width: ${windowWidth - 32}px;
  padding-top: 18px;
  font-size: 17px;
`;
