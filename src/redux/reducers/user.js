const initialState = null;

const user = (state = null, action) => {
  switch (action.type) {
    case "SET_DATA":
      return action.data;
    default:
      return state;
  }
};

export default user;
