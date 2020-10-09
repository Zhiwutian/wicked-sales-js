import React from "react";

export default function Header(props) {
  return (
    <header className="d-flex bg-dark align-items-center text-light mb-4">
      <div className=" d-flex header-title col-6">
        <img className="p-2 offset-1" src="./images/favicon.png" alt="Wicked Sales logo" width="75px"/>
        <h1 className="ml-3">Wicked Sales</h1>
      </div>
      <div className="cart-section col-5 d-flex justify-content-end">
        <p className="pr-2">{props.cartItemCount}</p>
        <p className="pr-2">{props.cartItemCount < 2 ? 'item' : 'items'}</p>
        <i class="fas fa-shopping-cart"></i>
      </div>
    </header>
  );
}
