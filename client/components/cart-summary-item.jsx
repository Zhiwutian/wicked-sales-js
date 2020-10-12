import React from 'react';
import priceFormatter from '../price-format';

export default function CartSummaryItem(props) {
  const { image, name, price, shortDescription } = props.cartData;
  return (
    <div className="col-12 card flex-row shadow-sm align-items-center mb-4">
      <img className="col-4 product-details-image p-3" src={image} alt=""/>
      <div className="col-8 card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{priceFormatter(price)}</p>
        <p className="card-text">{shortDescription}</p>
      </div>
    </div>
  );
}
