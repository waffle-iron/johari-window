import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import './_admin.sass';

export default class Admin extends Component {
  constructor(){
    super();
    this.state = {cohorts: []};
  }

  async componentDidMount(){
    const data = await this.retrieveCohorts(axios);
    this.setState({ cohorts: data })
  }

  async retrieveCohorts(conn){
    try {
      const response = await conn.get(
        'https://johariwindowapi.herokuapp.com/api/v1/cohorts'
      )
      return response.data
    } catch(error) {
      console.error(error)
    }
  }

  eachCohort(cohort, i){
    return (
      <Link key={i} to={'/admin/cohort/' + cohort.id}>
        {cohort.name}
      </Link>
    )
  }

  render() {
    const cohorts = this.state.cohorts.map(this.eachCohort)

    return (
      <div className='Admin'>
        <h1>Select a cohort to create groups.</h1>
        <div className='cohort-list'>
          { cohorts }
        </div>
      </div>
    );
  }
}

