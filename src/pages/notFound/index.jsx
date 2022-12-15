import React, { Component } from 'react';
import Header from '../../components/header';

export default class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <Header />
        <p>NotFound</p>
      </div>
    );
  }
}
