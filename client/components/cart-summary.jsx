import React from 'react';
import CartSummaryItem from './cart-summary-item';
export default function CartSummary(props) {

  return (
    <div className="">
      <button onClick={() => props.setView('catalog', {})}className="btn">&#8592; Back to Catalog</button>
      <h1>My Cart</h1>
      <div className="row">
        <CartSummaryItem cartData={props.cartState}/>
      </div>
      <h2>Item Total <span></span></h2>
    </div>
  );
}
