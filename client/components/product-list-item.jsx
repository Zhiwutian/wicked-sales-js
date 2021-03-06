import React from 'react';
import priceFormatter from '../price-format';

export default function ProductListItem(props) {
  const { productId, image, name, price, shortDescription } = props.productInfo;
  return (
    <div className="col-md-4 mb-3" onClick={() => props.setView('details', { productId })}>
      <div className="card product-card shadow-sm">
        <img src={image} className="card-img-top product-image" alt="A product image"/>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{priceFormatter(price)}</p>
          <p className="card-text">{shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
