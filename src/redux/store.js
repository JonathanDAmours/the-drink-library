import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/user-reducer";
import favouritesReducer from "./reducers/favourites-reducer";
import cocktailsReducer from "./reducers/cocktails-reducer";
const reducer = combineReducers({
  userReducer,
  favouritesReducer,
  cocktailsReducer,
});

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}
