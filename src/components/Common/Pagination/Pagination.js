import React from "react";

import icons from "../../../resources/icons/icons.svg";
import classes from "./Pagination.module.scss";

const pagination = (props) => {
  return (
    <div className={classes.pagination}>
      <svg
        onClick={props.pageNextClick}
        className={`${classes.pagination__icon} ${classes.icon__back}`}
        data-goto={props.prevPage}
      >
        <use xlinkHref={`${icons}#icon-left`}></use>
      </svg>
      <span className={classes.pagination__current}>{props.currPage}</span>
      <span className={classes.pagination__line}>&nbsp;</span>
      <span className={classes.pagination__total}>{props.totalPages}</span>
      <svg
        onClick={props.pageNextClick}
        className={`${classes.pagination__icon} ${classes.icon__front}`}
        data-goto={props.nextPage}
      >
        <use xlinkHref={`${icons}#icon-right`}></use>
      </svg>
    </div>
  );
};

export default pagination;
