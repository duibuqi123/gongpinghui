import React, { Component } from 'react';
import simpleHoc from './simple-hoc';

class Usual extends Component {
  render() {
    console.log(this.props, 'props');
    return (
      <div>
        Usual
      </div>
    )
  }
}
export default simpleHoc(Usual);

