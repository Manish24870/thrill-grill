import React from "react";

import classes from "./Search.module.scss";
import icons from "../../../../resources/icons/icons.svg";

const search = () => {
  return (
    <div className={classes.search}>
      <form action="#" className={classes.search__form}>
        <input
          type="text"
          className={classes.search__input}
          placeholder="Search"
        />
        <button
          onClick={(e) => e.preventDefault()}
          className={classes.search__button}
        >
          <svg className={classes.search__logo}>
            <use xlinkHref={`${icons}#icon-search`}></use>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default search;
