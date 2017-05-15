import React, { Component } from 'react';
import './_header.sass';

class Header extends Component {

  render() {
    return (
      <div className="Header">
        <h3>{ this.props.user.name }</h3>
      </div>
    );
  }
}

export default Header;
