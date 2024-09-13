import * as actions from "./actiontypes";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_EXPENSE:
      return {
        ...state,
        items: action.payload,
      };
    case actions.ADD_EXPENSE:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
