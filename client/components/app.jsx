import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
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
    return (
      <div>
        <Header/>
        <div className="container">
          {this.renderView()}
        </div>
      </div>

    );
  }
}
