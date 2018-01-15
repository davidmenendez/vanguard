import React from 'react';
import Signup from './Signup';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <section>
        <h3>provide your information</h3>
        <h4>personal</h4>
        <Signup />
      </section>
    )
  }
};