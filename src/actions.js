import * as actions from "./actiontypes";

export const fetchItems = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:4000/items");
      const data = await response.json();
      dispatch({
        type: actions.GET_ALL_EXPENSE,
        payload: data,
      });
    } catch (error) {
      alert("Error fetching items:", error.message || error);
    }
  };
};

export const addItem = (expense) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:4000/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // Handle non-200 responses
      }
      const data = await response.json();
      dispatch({
        type: actions.ADD_EXPENSE,
        payload: data,
      });
    } catch (error) {
      alert("Error adding items:", error);
    }
  };
};
