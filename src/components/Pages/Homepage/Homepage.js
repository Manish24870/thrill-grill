import React from "react";
import { Link } from "react-router-dom";

import Navigation from "../../Common/Navigation/Navigation";
import classes from "./Homepage.module.scss";

const homepage = (props) => {
  return (
    <div className={classes.homepage}>
      <Navigation cartAmount={props.cartAmount} />
      <div className={classes.main}>
        <h1 className={classes.heading__primary}>Eat</h1>
        <h2 className={classes.heading__secondary}>Like a king</h2>
        <Link to="/burgers" className={`${classes.btn} ${classes.btn__shop}`}>
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default homepage;
