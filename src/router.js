// Libraries
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// Components
// import { store } from './index'
// import AuthService from './utils/AuthService';
// import App from './App/AppContainer';
// import Cohort from './cohort/CohortContainer';
// import Login from './login/LoginContainer';
// import Main from './main/Main';
// import Johari from './johari/JohariContainer';
// import NoMatch from './NoMatch/NoMatch';
// import MyWindow from './MyWindow/MyWindowContainer';
// import Admin from './admin/AdminContainer';
// import User from './user/User';
// import Axios from 'axios';

// Styles
import './_shared.sass';

// const auth = new AuthService('Uj8xsUj6Hvdmep3V9d2TOQJFqgLOSIym', 'turingschool.auth0.com');
export const PrivateRoute = ({ auth, component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      auth.loggedIn()
        ? (<Component user={user} {...rest}/>)
        : (<Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
    )}
  />
);

// export const Routes = () => {
//   return (
//     <div className='Router'>
//       <Route path='/' component={App} />
//       <Switch>
//         <PrivateRoute exact path='/' component={Main} />
//         <Route
//           path='/admin/cohort/:id'
//           render={({match}) =>
//             <Cohort cohortID={match.params.id} />
//           }
//         />
//         <Route
//           path='/johari/:id'
//           render={({match}) =>
//             <Johari evaluateeID={match.params.id}  />
//           }
//         />
//         <PrivateRoute path='/mywindow' component={MyWindow} />
//         <PrivateRoute path='/admin' component={Admin} />
//         <Route path='/login' render={ () => <Login auth={auth} /> } />
//         <Route render={() => <NoMatch /> } />
//       </Switch>
//     </div>
//   )
// };
