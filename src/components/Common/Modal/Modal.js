import React from "react";

import Spinner from "../Spinner/Spinner";
import icons from "../../../resources/icons/icons.svg";
import classes from "./Modal.module.scss";

const modal = (props) => {
  let modalContent = null;

  //if modal type is of order success
  if (props.data.show && props.data.type === "orderSuccess") {
    modalContent = (
      <div className={classes.modal} onClick={props.modalClose}>
        <div className={classes.modal__content}>
          <h1 className={classes.modal__message}>{props.data.message}</h1>
          <svg className={classes.modal__icon}>
            <use xlinkHref={`${icons}#icon-check-circle`}></use>
          </svg>
        </div>
      </div>
    );
  } else if (props.data.show && props.data.type === "error") {
    //If modal type is of error
    modalContent = (
      <div className={classes.modal} onClick={props.modalClose}>
        <div className={classes.modal__content}>
          <h1 className={classes.modal__error}>{props.data.message}</h1>
        </div>
      </div>
    );
  } else if (props.data.show && props.data.type === "loading") {
    //If modal type is of loading
    modalContent = (
      <div className={classes.modal} onClick={props.modalClose}>
        <div className={classes.modal__content}>
          <Spinner />
        </div>
      </div>
    );
  }

  return modalContent;
};

export default modal;
