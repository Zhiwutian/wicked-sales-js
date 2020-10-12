import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.addToCart = this.addToCart.bind(this);
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems() {
    fetch('./api/cart')
      .then(resp => resp.json())
      .then(resp => {
        this.setState({ cart: resp });
      });
  }

  addToCart(product) {
    const options = {
      method: 'POST'
    };
    fetch(`./api/cart/${product}`, options)
      .then(resp => resp.json())
      .then(resp => {
        const cartArray = this.state.cart.slice();
        cartArray.push(resp);
        this.setState({ cart: cartArray });
      });
  }

  setView(name, params) {
    this.setState({
      view: {
        name,
        params
      }
    });
  }

  renderView() {
    if (this.state.view.name === 'catalog') {
      return <ProductList setView={this.setView}/>;
    } else if (this.state.view.name === 'cart') {
      return <CartSummary setView={this.setView} cartState={this.state.cart}/>;
    } else {
      return <ProductDetails productInfo={this.state.view.params} setView={this.setView} addToCart={this.addToCart}/>;

    }
  }

  render() {
    return (
      <div>
        <Header cartItemCount={this.state.cart.length} setView={this.setView}/>
        <div className="container">
          {this.renderView()}
        </div>
      </div>

    );
  }
}
