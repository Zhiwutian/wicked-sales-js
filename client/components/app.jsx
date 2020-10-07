import React from 'react';
import Header from './header';
import ProductList from './product-list';
export default class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Header/>
        <div className="container">
          <ProductList/>
        </div>
      </div>

    );
  }
}
