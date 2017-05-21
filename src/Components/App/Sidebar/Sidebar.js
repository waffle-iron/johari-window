import React, { Component, PropTypes as T } from 'react';
import { Link } from 'react-router-dom';
import './_sidebar.sass';

class Sidebar extends Component {
  static propTypes = {
    location: T.object,
  }

  render() {
    const { user } = this.props
    const logout = user.name && (
      <a href="https://turingschool.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost:3000/">
        logout
      </a> 
    )
    return (
      <div className='Sidebar'>
        <div className='sidebar-header'>
          <h1>Johari Window</h1>
        </div>
        <div className='sidebar-links'>
          <Link to='/'>Assignments</Link>
          <Link to='/mywindow'>My Window</Link>
          <Link to='/admin'>Admin</Link>
        </div>
        <div className='sidebar-user-info'>
          <p>logged in as: {user.name}</p>
          { logout || null }
        </div>
      </div>
    );
  }
}

export default Sidebar;
