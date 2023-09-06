import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div
        className="fixed bg-gray-300 opacity-50 w-full h-[100vh]
        top-0 left-0 flex justify-center items-center"
      >
        <span className="loading loading-bars loading-lg" />
      </div>
    );
  }
}
