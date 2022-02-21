import React from "react";

import CheckoutButton from "../CheckoutButton/CheckoutButton";
import classes from "./Summary.module.scss";

const summary = (props) => {
  return (
    <div className={classes.summary}>
      <div className={classes.summaryItem}>
        <h2 className={classes.summaryItem__heading}>Summary</h2>
        <div className={classes.summaryInfo}>
          <div
            className={`${classes.summaryInfo__item} ${classes.summaryInfo__type}`}
          >
            <span>Delivery Type:</span>
            <select
              onChange={(e) => props.deliveryChange(e)}
              value={props.selected}
            >
              <option value="free">Free</option>
              <option value="cheap">Cheap</option>
              <option value="fastest">Fastest</option>
            </select>
          </div>
          <div
            className={`${classes.summaryInfo__item} ${classes.summaryInfo__shipping}`}
          >
            <span className={classes.summaryInfo__shipping__heading}>
              Delivery Charge:
            </span>
            <span className={classes.summaryInfo__shipping__price}>
              $ {props.summary.deliveryCharge}
            </span>
          </div>
          <div
            className={`${classes.summaryInfo__item} ${classes.summaryInfo__total}`}
          >
            <span className={classes.summaryInfo__total__heading}>Total:</span>
            <span className={classes.summaryInfo__total__price}>
              $ {props.summary.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      {props.hasButton ? (
        <CheckoutButton isCartEmpty={props.isCartEmpty} />
      ) : null}
    </div>
  );
};

export default summary;
