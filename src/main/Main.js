import React, { Component } from 'react';
import './_main.sass';
import Header from './Header/Header';
import AssigneeList from './AssigneeList/AssigneeList';

class Main extends Component {
  render() {
    return (
      <div className='Main'>
        <Header user={this.props.user}/>
        <AssigneeList user={this.props.user}/>
      </div>
    );
  }
}

export default Main;
