const initialState = {};

export default function favouritesReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_FAVOURITES": {
      return {};
    }
    case "REMOVE_FAVOURITES": {
      return {};
    }
    default: {
      return { ...state };
    }
  }
}
