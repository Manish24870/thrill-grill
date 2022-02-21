import React from "react";

import Navigation from "../../Common/Navigation/Navigation";
import OrderForm from "./OrderForm/OrderForm";
import Summary from "../Checkout/Summary/Summary";
import classes from "./Order.module.scss";

const order = (props) => {
  return (
    <div className={classes.order}>
      <Navigation cartAmount={props.cartAmount} />
      <h2 className={classes.order__heading}>Place Your Order</h2>
      <OrderForm
        summary={props.summary}
        cart={props.cart}
        resetState={props.resetState}
      />
      <Summary
        summary={props.summary}
        deliveryChange={props.deliveryChange}
        selected={props.selectedValue}
        hasButton={false}
      />
    </div>
  );
};

export default order;
