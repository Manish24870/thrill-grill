import React from "react";

import classes from "./Burger.module.scss";

const burger = (props) => {
  return (
    <div className={classes.burger}>
      <img
        className={classes.burger__image}
        src={props.element.image}
        alt={props.element.name}
      />
      <h3 className={classes.burger__name}>{props.element.name}</h3>
      <p className={classes.burger__price}>
        Price: <span>$ {props.element.price}</span>
      </p>
      <p className={classes.burger__weight}>
        Weight: <span>{props.element.weight} Calorie</span>
      </p>
      <p className={classes.burger__type}>
        Type: <span>{props.element.type}</span>
      </p>
      <p className={classes.burger__size}>
        Size: <span>{props.element.size}</span>
      </p>
      <button
        onClick={() => props.addToCart(props.element.id)}
        className={`${classes.btn} ${classes.btn__cart}`}
        disabled={props.inCart}
      >
        {props.inCart ? "In Cart" : "Add to cart"}
      </button>
    </div>
  );
};

export default burger;
