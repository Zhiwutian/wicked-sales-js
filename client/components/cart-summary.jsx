import React from 'react';
import CartSummaryItem from './cart-summary-item';
import priceFormatter from '../price-format';

export default function CartSummary(props) {
  const totalPrice = props.cartState.reduce((accumulator, currentValue) => accumulator += currentValue.price, 0);
  return (
    <div className="row">
      <button onClick={() => props.setView('catalog', {})}className="btn">&#8592; Back to Catalog</button>
      <h1 className="col-12 mt-3 mb-4">My Cart</h1>
      <div className="row">
        {props.cartState.map(item => <CartSummaryItem key={item.productId} cartData={item}/>)}
      </div>
      <div className=" col-12 d-flex justify-content-between pb-5">
        <h2 className="mt-3">Item Total <span>{priceFormatter(totalPrice)}</span></h2>
        { props.cartState.length !== 0 &&
          <button onClick={() => props.setView('checkout', {})} className="btn btn-primary">Checkout</button>
        }
      </div>
    </div>
  );
}
