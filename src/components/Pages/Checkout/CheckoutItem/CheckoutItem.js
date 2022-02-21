import React from "react";

import classes from "./CheckoutItem.module.scss";
import icons from "../../../../resources/icons/icons.svg";

const checkoutItem = (props) => {
  return (
    <div className={classes.checkoutItem}>
      <div className={classes.checkoutItem__image}>
        <img src={props.item.image} alt={props.item.name} />
      </div>
      <h4 className={classes.checkoutItem__name}>{props.item.name}</h4>
      <svg
        className={classes.checkoutItem__close}
        onClick={() => props.removeFromCart(props.item.id)}
      >
        <use xlinkHref={`${icons}#icon-clear`}></use>
      </svg>
      <div className={classes.checkoutItem__amount}>
        <svg
          className={classes.checkoutItem__sub}
          onClick={() => props.decreaseCount(props.item.id)}
        >
          <use xlinkHref={`${icons}#icon-subtract`}></use>
        </svg>
        <span className={classes.checkoutItem__count}>{props.item.count}</span>
        <svg
          className={classes.checkoutItem__add}
          onClick={() => props.increaseCount(props.item.id)}
        >
          <use xlinkHref={`${icons}#icon-add`}></use>
        </svg>
      </div>
      <p className={classes.checkoutItem__price}>
        $ {props.item.totalPrice.toFixed(2)}
      </p>
    </div>
  );
};

export default checkoutItem;
