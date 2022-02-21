import React from "react";

import CheckoutItem from "./CheckoutItem/CheckoutItem";
import Summary from "./Summary/Summary";
import Navigation from "../../Common/Navigation/Navigation";
import classes from "./Checkout.module.scss";

const checkout = (props) => {
  console.log(props);
  let items = <p className={classes.cartEmpty}>Your cart is empty</p>;

  if (props.cart.length > 0) {
    items = props.cart.map((item) => (
      <CheckoutItem
        key={item.id}
        increaseCount={props.increaseItemCount}
        decreaseCount={props.decreaseItemCount}
        removeFromCart={props.removeFromCart}
        item={item}
      />
    ));
  }
  return (
    <div className={classes.checkout}>
      <Navigation cartAmount={props.cartAmount} />
      <h2 className={classes.checkout__heading}>Checkout</h2>
      <div className={classes.checkoutItems}>{items}</div>
      {props.cart.length === 0 ? null : (
        <Summary
          summary={props.summary}
          deliveryChange={props.deliveryChange}
          hasButton={true}
          selected={props.selectedValue}
          isCartEmpty={props.cart.length === 0}
        />
      )}
    </div>
  );
};

export default checkout;
