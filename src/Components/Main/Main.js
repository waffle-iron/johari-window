import React, { Component } from 'react';
import './_main.sass';
import Header from './Header/Header';
import AssigneeList from './AssigneeList/AssigneeList';

class Main extends Component {
  render() {
    const { user, assignees, setAssignee } = this.props

    return (
      <div className='Main'>
        <Header user={user} />
        <AssigneeList
          assignees={assignees}
          user={user}
          setAssignee={setAssignee}
        />
      </div>
    )
  }
}

export default Main;
