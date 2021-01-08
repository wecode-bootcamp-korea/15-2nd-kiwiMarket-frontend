const initialState = {
  phoneNumber: "",
  myTown: [],
  nickname: "",
};

const user = (state = null, action) => {
  switch (action.type) {
    case "SET_DATA":
      return action.data;
    default:
      return state;
  }
};

export default user;
