import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../actions";
import { useNavigate } from "react-router-dom";

const AddNew = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const [payeeName, setPayeeName] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!payeeName) {
      alert("Please select a payee name.");
      return false;
    }
    if (!expenseDescription) {
      alert("Please enter the product purchased.");
      return false;
    }
    if (!price || isNaN(price) || price <= 0) {
      alert("Please enter a valid price (positive number).");
      return false;
    }
    if (!date) {
      alert("Please select a date.");
      return false;
    }
    const currentMonth = new Date().getMonth();
    const dateOb = new Date(date);
    const selectedMonth = dateOb.getMonth();
    if (selectedMonth < currentMonth) {
      alert("Cannot select dates from the previous month.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    const expense = {
      payeeName,
      expenseDescription,
      price: Math.round(price),
      date,
      id: items.length + 1,
    };
    dispatch(addItem(expense));
    navigate("/");
  };

  return (
    <div className="addNew">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="header">
            <h6>Add new Item</h6>
            <p className="red">
              Read the below instructions before proceeding:
            </p>
            <p>Make sure you fill all the fields where * provided</p>
          </div>
          <label>
            <p>
              Name<span style={{ color: "red" }}>*</span>:
            </p>
            <select
              value={payeeName}
              required
              onChange={(e) => setPayeeName(e.target.value)}
            >
              <option value="">Choose</option>
              <option value="Rahul Chowdhary">Rahul Chowdhary</option>
              <option value="Ramesh Ekka">Ramesh Ekka</option>
            </select>
          </label>
          <label>
            <p>
              Product purchased<span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="text"
              value={expenseDescription}
              required
              onChange={(e) => setExpenseDescription(e.target.value)}
            />
          </label>
          <label>
            <p>
              Price<span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="number"
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            <p>
              Date<span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="date"
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <div className="btns">
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => navigate("/")}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNew;
