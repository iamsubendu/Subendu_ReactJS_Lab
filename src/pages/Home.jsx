import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../actions";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const [rahulPaid, setRahulPaid] = useState(0);
  const [rameshPaid, setRameshPaid] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    const getTotals = () => {
      let rahulTotal = 0;
      let rameshTotal = 0;

      items &&
        items.forEach((item) => {
          if (item.payeeName === "Rahul Chowdhary") {
            rahulTotal += item.price;
          } else if (item.payeeName === "Ramesh Ekka") {
            rameshTotal += item.price;
          }
        });

      setRahulPaid(rahulTotal);
      setRameshPaid(rameshTotal);
    };

    getTotals();
  }, [items]);

  const total = rahulPaid + rameshPaid;
  const average = Math.round(total / 2);
  const willPay =
    average > rahulPaid
      ? {
          pay: average - rahulPaid,
          name: "Rahul",
        }
      : {
          pay: average - rameshPaid,
          name: "Ramesh",
        };

  return (
    <>
      <div className="home">
        <div className="left">
          <table>
            <thead>
              <tr>
                <td>Date</td>
                <td>Product Purchased</td>
                <td>Price</td>
                <td>Payee</td>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.length > 0 &&
                items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.expenseDescription}</td>
                    <td>{item.price}</td>
                    <td
                      className={
                        item.payeeName === "Rahul Chowdhary"
                          ? "rahul"
                          : "ramesh"
                      }
                    >
                      {item.payeeName}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="right">
          <button onClick={() => navigate("/add")}>Add expense</button>
          <div className="total">
            <div className="items">
              <p className="i3">Total:</p>
              <p className="i1">{total}</p>
            </div>
            <div className="items">
              <p className="i3">Rahul paid:</p>
              <p className="rahul">{rahulPaid}</p>
            </div>
            <div className="items">
              <p className="i3">Ramesh paid:</p>
              <p className="ramesh">{rameshPaid}</p>
            </div>
            <div className="items">
              <p className="bgRed">Pay {willPay.name}</p>
              <p className="bgRed">{willPay.pay}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
