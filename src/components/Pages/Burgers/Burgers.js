import React, { Component } from "react";

import Burger from "./Burger/Burger";
import Search from "./Search/Search";
import Navigation from "../../Common/Navigation/Navigation";
import Pagination from "../../Common/Pagination/Pagination";
import Modal from "../../Common/Modal/Modal";
import Spinner from "../../Common/Spinner/Spinner";
import classes from "./Burgers.module.scss";

class Burgers extends Component {
  state = {
    pageBurgers: [],
    resultsPerPage: 9,
    totalPages: 0,
    previousPage: 0,
    currentPage: 1,
    nextPage: 2,
    modal: {
      show: false,
      message: "",
      type: null,
    },
  };

  //Extract limited burgers to render
  extractPageBurgers = (page = 1, rpp = 9) => {
    const startingIndex = (page - 1) * rpp;
    const endingIndex = page * rpp;
    const pageBurgers = this.props.burgers.slice(startingIndex, endingIndex);
    this.setState({ pageBurgers: pageBurgers });
  };

  //Handles next page and previous page click
  pageNextHandler = (e) => {
    const curr = Number(e.target.closest("svg").dataset.goto);
    if (curr !== 0 && curr !== this.state.totalPages + 1) {
      const next = curr + 1;
      const prev = curr - 1;
      this.setState({
        currentPage: curr,
        nextPage: next,
        previousPage: prev,
      });
      this.extractPageBurgers(curr);
    }
  };

  async componentDidMount() {
    try {
      await this.props.getBurgers();
      const totalPages = Math.ceil(
        this.props.burgers.length / this.state.resultsPerPage
      );
      this.setState({ totalPages: totalPages });
      this.extractPageBurgers();
    } catch (err) {
      const modalData = {
        show: true,
        message: "Failed to load burgers",
        type: "error",
      };
      //Show error modal
      this.setState({
        modal: modalData,
      });
    }
  }

  //Modal close handler
  modalCloseHandler = () => {
    //Cannot close modal when it is of type loading
    if (this.state.modal.type !== "loading") {
      const modalData = {
        show: false,
        message: "",
        type: null,
      };
      this.setState({
        modal: modalData,
      });
    }
  };

  render() {
    let items = null;
    if (!this.state.modal.show) {
      items = <Spinner />;
    }
    if (this.state.pageBurgers.length > 0) {
      items = this.state.pageBurgers.map((el) => {
        const cartIndex = this.props.cart.findIndex(
          (item) => item.id === el.id
        );
        return (
          <Burger
            key={el.id}
            element={el}
            addToCart={this.props.addToCart}
            inCart={cartIndex > -1}
          />
        );
      });
    }

    return (
      <div className={classes.burgers}>
        <Navigation cartAmount={this.props.cartAmount} />
        <Search />
        <h1 className={classes.headingText}>Our Burgers</h1>
        <div className={classes.allBurgers}>{items}</div>
        {this.state.pageBurgers.length === 0 ? null : (
          <Pagination
            prevPage={this.state.previousPage}
            nextPage={this.state.nextPage}
            totalPages={this.state.totalPages}
            currPage={this.state.currentPage}
            pageNextClick={(e) => this.pageNextHandler(e)}
          />
        )}
        <Modal modalClose={this.modalCloseHandler} data={this.state.modal} />
      </div>
    );
  }
}

export default Burgers;
