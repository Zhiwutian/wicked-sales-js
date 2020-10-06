import React from "react";

export default function ProductListItem(props) {
  console.log(props)
  const {image, name, price, shortDescription} = props.productInfo;

  return (
    <div className="card">
      <img src={image} className="card-img-top" alt="A product image"/>
      <div className="card-body">
      <h5 className="card-title">{name}</h5>
      <p className="card-text">{`$${price.toString().slice(0,2)}`}</p>
      </div>
    </div>
  )
}
