import React, { Component } from 'react';
import Header from '../../components/header';

export default class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Favorite</p>
      </div>
    );
  }
}
