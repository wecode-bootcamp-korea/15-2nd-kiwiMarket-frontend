const initialState = { id: 0, title: "카테고리 선택" };

const postCategory = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT":
      return action.selectedCategory;

    case "GO_BACK":
      return initialState;

    default:
      return state;
  }
};

export default postCategory;
