import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './_assignee.sass'

class Assignee extends Component {
  constructor() {
    super()
    this.completedAssignee = this.completedAssignee.bind(this)
    this.incompleteAssignee = this.incompleteAssignee.bind(this)
  }

  completedAssignee() {
    return (
      <div className={'Assignee completed-assignee'}>
        <a>{ this.props.name }</a>
      </div>
    )
  }

  incompleteAssignee() {
    const { setAssignee, id, name } = this.props

    return (
      <div 
        className='Assignee incomplete-assignee'
        onClick={() => setAssignee(id, name)}
      >
        <Link to={`/johari/${id}`}>
          { name }
        </Link>
      </div>
    )
  }

  render() {
    if (this.props.completed) { return this.completedAssignee() }
    else { return this.incompleteAssignee() }
  }
}

export default Assignee
