import React from "react";
import priceFormatter from "../price-format";

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const totalPrice = this.props.cartState.reduce((accumulator, currentValue) => accumulator += currentValue.price, 0);

    return (
      <div className="row">
      <h1 className="col-12 mt-3 mb-4">My Cart</h1>
      <h2 className="mt-3">Item Total <span>{priceFormatter(totalPrice)}</span></h2>
      <form action="">
        <div className="form-group">
          <label className="form-control" htmlFor="">Name</label>
          <input type="text"/>
        </div>
        <div>
          <div>
            <label htmlFor="">Credit Card</label>
          </div>
          <input type="text"/>
        </div>
        <div>
          <div>
            <label htmlFor="">Shipping Address</label>
          </div>
          <input type="textArea"/>
        </div>
      </form>

    </div>
    )
  }





}
