import React, { Component , Fragment} from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

import { post } from '../../services/requester'

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
      username:localStorage.getItem('username') || null,
      // username:'Bruno',
      isAdmin:localStorage.getItem('isAdmin') || false,
      // isAdmin:true
    }
  }

  register =(userData)=>{
    post('user', '', 'basic', userData)
    .then(rawData=>rawData.json())
    .then(body=>{
      localStorage.setItem('authtoken', body._kmd.authtoken);
      localStorage.setItem('userId', body._id);
      localStorage.setItem('username', body.username);
      this.setState({
        username:body.username,
        isAdmin:body.roles.includes('Admin')
      })
    }).catch(err=>console.log(err))
  }

  login=(userData)=>{
    post('user', 'login', 'basic', userData)
    .then(rawData=>rawData.json())
    .then(body=>{
      localStorage.setItem('authtoken', body._kmd.authtoken);
      localStorage.setItem('userId', body._id);
      localStorage.setItem('username', body.username);
      this.setState({
        username:body.username,
        isAdmin:body.roles.includes('Admin')
      })
    }).catch(err=>console.log(err))
  }

  logout = () => {
    let logoutData = {
      authtoken: localStorage.getItem('authtoken')
    };
    post('user', '_logout', 'kinvey', logoutData)
    .then(response=>response.json())
    .then(body=>{
      localStorage.clear();
      this.setState({
        username:null,
        isAdmin:false
      })
    }).catch(err=>console.log(err));
  }

  render() {
    const {username, isAdmin}=this.state;
    return (
      <BrowserRouter>
        <div className="site">
          <Header username={this.state.username} isAdmin={this.state.isAdmin} logout={this.logout}/>
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
                render={()=>(
                  username ? <Redirect to="/"/>:<Login login={this.login}/>)
                } 
              />
              <Route 
                path='/register' 
                render={()=><Register register={this.register}/>} 
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
