import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Catalog from '../Catalog/Catalog';
import Dashboard from '../Dashboard/Dashboard';

import './App.css';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      // username:localStorage.getItem('username') || null,
      username:'Bruno',
      // isAdmin:localStorage.getItem('isAdmin') || false,
      isAdmin:true
    }
  }
  render() {
    const {username, isAdmin}=this.state;
    return (
      <BrowserRouter>
        <div className="site">
          <Header username={this.state.username} isAdmin={this.state.isAdmin}/>
            <Switch>
              <Route exact
                path="/"
                render={()=>(
                  username ? (
                    isAdmin ? ( <Dashboard/> ):( <Catalog/> )
                  ) : (
                    <Home/>
                  )
                )}
              />
              <Route 
                path='/login' 
                component={Login} 
              />
              <Route 
                path='/register' 
                component={Register} 
              />
              <Route 
                path='/catalog' 
                component={Catalog} 
              />
            <Route 
              path='/dashboard' 
              component={Dashboard} 
            />
            </Switch>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
