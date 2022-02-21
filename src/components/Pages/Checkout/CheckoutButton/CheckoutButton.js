import React from "react";
import { Link } from "react-router-dom";

import classes from "./CheckoutButton.module.scss";

const checkoutButton = (props) => {
  return (
    <React.Fragment>
      {props.isCartEmpty ? (
        <Link
          to="/order"
          className={`${classes.btn} ${classes.btn__disabled}`}
          onClick={(e) => e.preventDefault()}
        >
          Checkout
        </Link>
      ) : (
        <Link to="/order" className={`${classes.btn} ${classes.btn__summary}`}>
          Checkout
        </Link>
      )}
    </React.Fragment>
  );
};

export default checkoutButton;
