const initialState = {
  currentUser: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SIGN_IN": {
      return { currentUser: action.currentUser };
    }
    case "SIGN_OUT": {
      return { currentUser: action.currentUser };
    }
    default: {
      return { ...state };
    }
  }
}
