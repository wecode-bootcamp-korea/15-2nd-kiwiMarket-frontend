import { Alert } from "react-native";

const initialState = [
  { id: 1, title: "디지털/가전", checked: true },
  { id: 2, title: "가구/인테리어", checked: true },
  { id: 3, title: "유아동/유아도서", checked: true },
  { id: 4, title: "생활/가공식품", checked: true },
  { id: 5, title: "스포츠/레저", checked: true },
  { id: 6, title: "여성잡화", checked: true },
  { id: 7, title: "여성의류", checked: true },
  { id: 8, title: "남성패션/잡화", checked: true },
  { id: 9, title: "게임/취미", checked: true },
  { id: 10, title: "뷰티/미용", checked: true },
  { id: 11, title: "반려동물용품", checked: true },
  { id: 12, title: "도서/티켓/음반", checked: true },
  { id: 13, title: "식물", checked: true },
  { id: 14, title: "기타 중고물품", checked: true },
  { id: 15, title: "삽니다", checked: true },
];

const category = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE":
      if (
        state.reduce((acc, category) => acc + (category.checked ? 1 : 0), 0) ===
          1 &&
        state[action.id].checked
      ) {
        Alert.alert("최소 1개 이상 선택해주세요", null, [{ text: "닫기" }]);
        return state;
      }
      return state.map((category, currentIdx) =>
        currentIdx === action.id
          ? { ...category, checked: !category.checked }
          : category
      );
    case "SET_INTERESTED_CATEGORY":
      return action.interested_category;
    default:
      return state;
  }
};

export default category;
