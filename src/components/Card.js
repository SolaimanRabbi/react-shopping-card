import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
    };
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cardItems: this.state.cardItems,
    };
    this.props.createOrder(order);
  };
  render() {
    const { cardItems } = this.props;
    return (
      <div>
        {cardItems.length === 0 ? (
          <div className="card card-header">Card is empty</div>
        ) : (
          <div className="card card-header">
            You have {cardItems.length} in the card
          </div>
        )}
        <div>
          <div className="card">
            <Fade left cascade>
              <ul className="card-items">
                {cardItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)} x {item.count}{" "}
                      <button
                        className="button"
                        onClick={() => this.props.removeFromCard(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cardItems.length !== 0 && (
            <div>
              <div className="card">
                <div className="total">
                  <div>
                    Total:{" "}
                    {formatCurrency(
                      cardItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    className="button primary"
                  >
                    Proceed
                  </button>
                </div>
              </div>
              {this.state.showCheckout && (
                <Fade right cascade>
                  <div className="card">
                    <form action="" onSubmit={this.createOrder}>
                      <ul className="form-container">
                        <li>
                          <label htmlFor="">Email</label>
                          <input
                            name="email"
                            type="email"
                            required
                            onChange={this.handleInput}
                          />
                        </li>
                        <li>
                          <label htmlFor="">Name</label>
                          <input
                            name="name"
                            type="text"
                            required
                            onChange={this.handleInput}
                          />
                        </li>
                        <li>
                          <label htmlFor="">Address</label>
                          <input
                            name="address"
                            type="text"
                            required
                            onChange={this.handleInput}
                          />
                        </li>
                        <li>
                          <button className="button primary" type="submit">
                            Checkout
                          </button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Card;
