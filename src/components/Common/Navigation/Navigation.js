import React from "react";
import { Link } from "react-router-dom";

import classes from "./Navigation.module.scss";
import icons from "../../../resources/icons/icons.svg";

const navigation = (props) => {
  return (
    <div className={classes.navigation}>
      <Link to="/" className={classes.logo}>
        <svg className={classes.logo__icon}>
          <use xlinkHref={`${icons}#icon-logo`}></use>
        </svg>
        <span className={classes.logo__text}>TG</span>
      </Link>
      <ul className={classes.nav}>
        <li className={classes.nav__item}>
          <Link to="/burgers" className={classes.nav__link}>
            Burgers
          </Link>
        </li>
      </ul>
      <Link to="/checkout" className={classes.cart}>
        <svg className={classes.cart__icon}>
          <use xlinkHref={`${icons}#icon-cart`}></use>
        </svg>
        <span className={classes.cart__count}>{props.cartAmount}</span>
      </Link>
    </div>
  );
};

export default navigation;
