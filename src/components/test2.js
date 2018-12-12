import React, { Component } from 'react';

const simpleHoc = dd => {
  console.log('simpleHoc');
  return class extends Component {
    render() {
      return <dd {...this.props}/>
    }
  }
}
export default simpleHoc;