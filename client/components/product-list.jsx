import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };

  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(resp => resp.json())
      .then(resp => this.setState({ products: resp }));
  }

  render() {
    if (!this.state.products.length) {
      return <h1>No products available</h1>;
    } else {
      return (
        <section className="row">
          {this.state.products.map(product => <ProductListItem key={product.productId} productInfo={product} />)}
        </section>
      );
    }

  }

}
