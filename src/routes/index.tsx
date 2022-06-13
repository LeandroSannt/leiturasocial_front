import React from "react";
import Route from './Route'

import SignIn from '../pages/SingIn'
import SignUp from '../pages/SingUp'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Dashboard/Profile'
import Books from '../pages/Books'
import Book from '../pages/Book'


import {Switch} from 'react-router-dom'

const Routes: React.FC = () => (

  <Switch>
    <Route path='/' exact component ={SignIn} />
    <Route path='/session/SingUp' exact component ={SignUp}  />
    <Route path='/dashboard' exact component ={Dashboard} isPrivate  />
    <Route path='/profile' exact component ={Profile} isPrivate  />
    <Route path='/books' exact component ={Books} isPrivate  />
    <Route path='/book/:id' exact component = {Book} isPrivate  />
  </Switch>

)

export default Routes;
