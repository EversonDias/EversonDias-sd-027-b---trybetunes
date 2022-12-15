import React, { Component } from 'react';
import Header from '../../components/header';

export default class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album</p>
      </div>
    );
  }
}
