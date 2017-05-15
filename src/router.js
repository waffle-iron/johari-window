// Libraries
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Components
import AuthService from './utils/AuthService';
import App from './App/App';
import Cohort from './Cohort/Cohort';
import Login from './Login/Login';
import Main from './Main/Main';
import Johari from './Johari/Johari';
import NoMatch from './NoMatch/NoMatch';
import MyWindow from './MyWindow/MyWindow';
import Admin from './Admin/Admin';
import User from './User/User';
import Axios from 'axios';

// Styles
import './app.css';

const auth = new AuthService('jH67SpOvPqTg0Jal6m49SCGdECSsFI4L', 'joahriwindow.auth0.com');

const redirect = props => (
  <Redirect 
    to={{ pathname: '/login', state: { from: props.location } }}
  />
);

const component = (Component, user, rest) => (<Component user={user} {...rest}/>)

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={ props => (auth.loggedIn() ? component(Component, user, {...rest}) : redirect(props)) }
  />
);

const setUser = (profile, token) => {
  if (!profile) { return false; }

  const parsed_profile = JSON.parse(profile);
  const user_info = {
    "user": {
      "name": parsed_profile.name,
      "github": parsed_profile.nickname,
      "token": token
    }
  };

  Axios.post('https://johariwindowapi.herokuapp.com/api/v1/users', user_info)
    .then(result => {
      const user_response = result.data;
      const user = new User(user_response);
      localStorage.setItem('user', JSON.stringify(user));
    })
    .catch(error => console.log(error));
}

setUser(localStorage.getItem('profile'), localStorage.getItem('id_token'));

const assignUser = () => {
  const user = localStorage.getItem('user');
  if (!user) { return {}; }
    
  return new User(JSON.parse(localStorage.getItem('user')));
}

export const routes = (
  <Router >
    <div className='Router'>
    <Route path='/' render={() => <App auth={auth} user={assignUser()} /> } />
      <Switch>
        <PrivateRoute exact path='/' component={Main} user={assignUser()} />
        <Route 
          path='/admin/cohort/:id'
          render={({match}) => 
            <Cohort cohortID={match.params.id} user={assignUser()} /> 
          } 
        />
        <Route 
          path='/johari/:id'
          render={({match}) => 
            <Johari evaluateeID={match.params.id} user={assignUser()} /> 
          } 
        />
        <PrivateRoute path='/mywindow' component={MyWindow} user={assignUser()} />
        <PrivateRoute path='/admin' component={Admin} user={assignUser()} />
        <Route path='/login' render={ () => <Login auth={auth} /> } />
        <Route render={() => <NoMatch /> } />
      </ Switch >
    </div>
  </Router>
);

