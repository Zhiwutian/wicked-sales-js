import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
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
    } else {
      return <ProductDetails productInfo={this.state.view.params} setView={this.setView}/>;
    }
  }

  render() {
    console.log(this.state.cart);
    return (
      <div>
        <Header cartItemCount={this.state.cart.length}/>
        <div className="container">
          {this.renderView()}
        </div>
      </div>

    );
  }
}
