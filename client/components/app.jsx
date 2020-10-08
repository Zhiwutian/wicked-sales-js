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

  renderViewer() {
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <Header/>
          <div className="container">
            <ProductList setView={this.setView}/>
          </div>
        </div>

      );
    } else {
      return (
        <div>
          <Header/>
          <div className="container">
            <ProductDetails productInfo={this.state.view.params} setView={this.setView}/>
          </div>
        </div>
      );
    }
  }

  render() {
    return this.renderViewer();
  }
}
