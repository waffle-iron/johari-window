import React, { Component } from 'react';
import Sidebar from './Sidebar/Sidebar';
import "./_app.sass";

class App extends Component {

  render() {
    return (
      <div className='App'>
        <Sidebar user={this.props.user} auth={this.props.auth}/>
      </div>
    )
  }
}

export default App;
