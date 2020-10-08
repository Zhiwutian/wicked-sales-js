import React from "react";
import priceFormatter from '../price-format';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch('api/products/3')
    .then(resp => resp.json())
    .then(resp => {
      this.setState({ product: resp });
    });
  }

  render() {
    console.log(this.state.product);
    if (!this.state.product) {
      return <h1>Loading Product info</h1>;
    } else {
      const {name, price, image, shortDescription, longDescription} = this.state.product;
      return (
        <section className="row">
          <div className="card shadow-sm">
            <div className="col-12 m-2">
              <button className="btn">&#8592; Back to Catalog</button>
            </div>
            <div className="row col-12 mt-2 mb-2">
              <div className="col-4">
                <img className="product-details-image" src={image} alt=""/>
              </div>
              <div className="col-8 card-body">
                <h3 className="card-title">{name}</h3>
                <p className="card-text text-muted">{priceFormatter(price)}</p>
                <p className="card-text">{shortDescription}</p>
              </div>
            </div>
            <div className="col-12">
              {longDescription.split("\\n").map(text => <p key={text}>{text}</p>)}
            </div>
          </div>

        </section>
      )
    }

  }
}
