const initialState = {};

export default function cocktailsReducer(state = initialState, action) {
  switch (action.type) {
    case "STORE_COCKTAILS": {
      return {
        ...state,
        cocktailList: action.cocktailList,
      };
    }
    default: {
      return {};
    }
  }
}
