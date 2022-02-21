import React, { Component } from "react";
import axios from "axios";

import Modal from "../../../Common/Modal/Modal";
import classes from "./OrderForm.module.scss";

class OrderForm extends Component {
  state = {
    formData: {
      fullname: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      zipcode: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    valid: false,
    modal: {
      show: false,
      message: "",
      type: null,
    },
  };

  //When for is submitted
  onFormSubmit = async (e) => {
    e.preventDefault();

    if (this.props.cart.length > 0) {
      const modalData = {
        show: true,
        message: "Order Pending",
        type: "loading",
      };
      //Show loading modal
      this.setState({ modal: modalData });

      const data = {
        cart: this.props.cart,
        summary: this.props.summary,
        userData: this.state.formData,
      };

      try {
        await axios.post(
          "https://thrill-grill.firebaseio.com/Orders.json",
          data
        );
        //Reset state of Layout
        this.props.resetState();
        const modalData = {
          show: true,
          message: "Order Success",
          type: "orderSuccess",
        };
        const newFormData = {
          fullname: {
            value: "",
            isValid: false,
          },
          email: {
            value: "",
            isValid: false,
          },
          address: {
            value: "",
            isValid: false,
          },
          zipcode: {
            value: "",
            isValid: false,
          },
          phone: {
            value: "",
            isValid: false,
          },
        };
        //Show success modal and reset the data
        this.setState({
          modal: modalData,
          valid: false,
          formData: newFormData,
        });
      } catch (err) {
        const modalData = {
          show: true,
          message: "Order Failed!",
          type: "error",
        };
        //Show error modal
        this.setState({
          modal: modalData,
        });
      }
    } else {
      const modalData = {
        show: true,
        message: "Your cart is empty",
        type: "error",
      };
      this.setState({
        modal: modalData,
      });
    }
  };

  //Checks validity for simgle input
  checkInputValidity = (val) => {
    if (val.length > 0) {
      return true;
    }
    return false;
  };

  //Checks validity for overall form
  checkFormValidity = (data) => {
    let valid = true;
    for (let item in data) {
      valid = valid && data[item].isValid;
    }
    return valid;
  };

  //When user types in the input
  onInputChange = (e) => {
    const newData = {
      ...this.state.formData,
    };
    const newInput = {
      ...this.state.formData[e.target.name],
    };
    newInput.value = e.target.value;
    newInput.isValid = this.checkInputValidity(e.target.value);
    newData[e.target.name] = newInput;

    this.setState({
      formData: newData,
      valid: this.checkFormValidity(newData),
    });
  };

  //Modal close handler
  modalCloseHandler = () => {
    //Cannot close modal when it is of type loading
    if (this.state.modal.type !== "loading") {
      const modalData = {
        show: false,
        message: "",
        type: null,
      };
      this.setState({
        modal: modalData,
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className={classes.orderForm}>
        <input
          type="text"
          name="fullname"
          placeholder="Your Name"
          className={classes.orderForm__input}
          onChange={this.onInputChange}
          value={this.state.formData.fullname.value}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={classes.orderForm__input}
          onChange={this.onInputChange}
          value={this.state.formData.email.value}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className={classes.orderForm__input}
          onChange={this.onInputChange}
          value={this.state.formData.address.value}
        />
        <input
          type="number"
          name="zipcode"
          placeholder="Zip Code"
          className={classes.orderForm__input}
          onChange={this.onInputChange}
          value={this.state.formData.zipcode.value}
        />
        <input
          type="number"
          name="phone"
          placeholder="Phone Number"
          className={classes.orderForm__input}
          onChange={this.onInputChange}
          value={this.state.formData.phone.value}
        />
        <button
          disabled={!this.state.valid}
          className={`${classes.btn} ${classes.btn__order}`}
        >
          Place Order
        </button>
        <Modal modalClose={this.modalCloseHandler} data={this.state.modal} />
      </form>
    );
  }
}

export default OrderForm;
