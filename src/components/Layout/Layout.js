import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import Homepage from "../Pages/Homepage/Homepage";
import Burgers from "../Pages/Burgers/Burgers";
import Checkout from "../Pages/Checkout/Checkout";
import Order from "../Pages/Order/Order";

class Layout extends Component {
  state = {
    burgers: null,
    cart: [],
    charges: {
      free: 0,
      cheap: 1.49,
      fastest: 2.99,
    },
    summary: {
      total: 0,
      deliveryType: "free",
      deliveryCharge: 0,
    },
  };

  //Reset the state
  resetStateHandler = () => {
    const resetSummary = {
      total: 0,
      deliveryType: "free",
      deliveryCharge: 0,
    };
    this.setState({
      cart: [],
      summary: resetSummary,
    });
  };

  //Get burgers from the database
  getBurgers = async () => {
    try {
      const res = await axios.get(
        "https://thrill-grill.firebaseio.com/Burgers.json"
      );
      this.setState({ burgers: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  //Adds item to the cart
  addToCartHandler = (id) => {
    const selectedBurger = this.state.burgers.find(
      (burger) => burger.id === id
    );
    const cartBurger = {
      ...selectedBurger,
      count: 1,
      totalPrice: selectedBurger.price,
    };

    const newSummary = {
      ...this.state.summary,
      total: this.state.summary.total + selectedBurger.price,
    };
    const newCart = [...this.state.cart, cartBurger];

    this.setState({
      cart: newCart,
      summary: newSummary,
    });
  };

  //Remove item from the cart
  removeFromCartHandler = (id) => {
    const removedItem =
      this.state.cart[this.state.cart.findIndex((item) => item.id === id)];
    const newCart = this.state.cart.filter((item) => item.id !== id);
    const newSummary = {
      ...this.state.summary,
      total: this.state.summary.total - removedItem.totalPrice,
    };

    this.setState({ cart: newCart, summary: newSummary });
  };

  //Increase item count in checkout page
  increaseItemCount = (id) => {
    const selectedBurgerIndex = this.state.cart.findIndex(
      (burger) => burger.id === id
    );
    const newTotal =
      this.state.cart[selectedBurgerIndex].totalPrice +
      this.state.cart[selectedBurgerIndex].price;
    const newCount = this.state.cart[selectedBurgerIndex].count + 1;

    const newBurger = {
      ...this.state.cart[selectedBurgerIndex],
      totalPrice: newTotal,
      count: newCount,
    };
    const newSummary = {
      ...this.state.summary,
      total:
        this.state.summary.total + this.state.cart[selectedBurgerIndex].price,
    };
    const newCart = [...this.state.cart];
    newCart[selectedBurgerIndex] = newBurger;

    this.setState({
      cart: newCart,
      summary: newSummary,
    });
  };

  //Decrease item count in checkout page
  decreaseItemCount = (id) => {
    const selectedBurgerIndex = this.state.cart.findIndex(
      (burger) => burger.id === id
    );

    if (this.state.cart[selectedBurgerIndex].count > 1) {
      const newTotal =
        this.state.cart[selectedBurgerIndex].totalPrice -
        this.state.cart[selectedBurgerIndex].price;
      const newCount = this.state.cart[selectedBurgerIndex].count - 1;

      const newBurger = {
        ...this.state.cart[selectedBurgerIndex],
        totalPrice: newTotal,
        count: newCount,
      };
      const newSummary = {
        ...this.state.summary,
        total:
          this.state.summary.total - this.state.cart[selectedBurgerIndex].price,
      };
      const newCart = [...this.state.cart];
      newCart[selectedBurgerIndex] = newBurger;

      this.setState({
        cart: newCart,
        summary: newSummary,
      });
    }
  };

  //When delivery type changes
  deliveryChageHandler = (e) => {
    const newTotal =
      this.state.summary.total +
      this.state.charges[e.target.value] -
      this.state.charges[this.state.summary.deliveryType];
    const newSummary = {
      deliveryType: e.target.value,
      deliveryCharge: this.state.charges[e.target.value],
      total: newTotal,
    };

    this.setState({ summary: newSummary });
  };

  render() {
    return (
      <Routes>
        <Route
          path="/"
          exact
          element={<Homepage cartAmount={this.state.cart.length} />}
        ></Route>
        <Route
          path="/burgers"
          exact
          element={
            <Burgers
              getBurgers={this.getBurgers}
              burgers={this.state.burgers}
              addToCart={this.addToCartHandler}
              cart={this.state.cart}
              cartAmount={this.state.cart.length}
            />
          }
        ></Route>
        <Route
          path="/checkout"
          exact
          element={
            <Checkout
              removeFromCart={this.removeFromCartHandler}
              increaseItemCount={this.increaseItemCount}
              decreaseItemCount={this.decreaseItemCount}
              cart={this.state.cart}
              summary={this.state.summary}
              deliveryChange={this.deliveryChageHandler}
              selectedValue={this.state.summary.deliveryType}
              cartAmount={this.state.cart.length}
            />
          }
        ></Route>
        <Route
          path="/order"
          exact
          element={
            <Order
              cart={this.state.cart}
              summary={this.state.summary}
              deliveryChange={this.deliveryChageHandler}
              selectedValue={this.state.summary.deliveryType}
              cartAmount={this.state.cart.length}
              resetState={this.resetStateHandler}
            />
          }
        ></Route>
      </Routes>
    );
  }
}

export default Layout;
