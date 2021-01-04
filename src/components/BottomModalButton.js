import React, { useState } from "react";
import Modal from "react-native-modal";
import styled from "styled-components/native";
import { Octicons, FontAwesome } from "react-native-vector-icons";

const BottomModalButton = ({ goPostItem, addressId }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleAndGo = (type) => {
    toggleModal();
    goPostItem(type, addressId);
  };

  return (
    <ModalContainer>
      <PlusButton onPress={toggleModal}>
        <Octicons name="plus" size={25} color="#fff" />
      </PlusButton>
      <Modal isVisible={isModalVisible} animationInTiming={500}>
        <ModalPressable onPress={toggleModal}>
          <GoButton
            bottom={110}
            onPress={() => {
              toggleAndGo("동네홍보");
            }}
          >
            <IconText>동네홍보</IconText>
            <IconWrap>
              <FontAwesome name="home" size={25} color="#fff" />
            </IconWrap>
          </GoButton>
          <GoButton
            bottom={60}
            onPress={() => {
              toggleAndGo("중고거래");
            }}
          >
            <IconText>중고거래</IconText>
            <IconWrap>
              <FontAwesome name="pencil" size={25} color="#fff" />
            </IconWrap>
          </GoButton>
        </ModalPressable>
      </Modal>
    </ModalContainer>
  );
};

export default BottomModalButton;

const ModalContainer = styled.View`
  flex: 1;
`;

const ModalPressable = styled.Pressable`
  flex: 1;
`;

const PlusButton = styled.Pressable`
  position: absolute;
  bottom: 8px;
  right: 16px;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.kiwi};
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const GoButton = styled.Pressable.attrs((props) => ({
  bottom: props.bottom || 0,
}))`
  position: absolute;
  flex-direction: row;
  align-items: center;
  bottom: ${(props) => 74 + props.bottom}px;
  right: 2.5px;
`;

const IconText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin-right: 8px;
`;

const IconWrap = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.kiwi};
  justify-content: center;
  align-items: center;
`;
