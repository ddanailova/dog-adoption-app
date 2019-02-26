import React, { Component , Fragment} from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

import userService from '../../services/userService';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Catalog from '../Catalog/Catalog';
import Dashboard from '../Dashboard/Dashboard';

import './App.css';

const User = new userService();

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      username:localStorage.getItem('username') || null,
      isAdmin:localStorage.getItem('isAdmin') || false,
    }
  }

  register =(userData)=>{
    User.register(userData).then((resBody)=>{
      let isAdmin = User.isUserAdmin(resBody);
      User.storeUserData(resBody);

      this.setState({
        username:resBody.username,
        isAdmin:isAdmin
      })
    }).catch(err=>console.log(err));
  }

  login=(userData)=>{
    User.login(userData)
    .then(resBody=>{ 
      let isAdmin = User.isUserAdmin(resBody);
      User.storeUserData(resBody);

      this.setState( {
        username:resBody.username,
        isAdmin:isAdmin
      })
    }).catch(err=>console.log(err))
  }

  logout = () => {
    User.logout()
    .then(response=>{
      User.clearStoredData();
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
                  username ? (
                    <Redirect to="/"/>
                  ) : (
                    <Login login={this.login}/>
                  )
                )} 
              />
              <Route 
                path='/register' 
                render={()=>(
                  username?(
                    <Redirect to="/"/>
                  ):(
                    <Register register={this.register}/>
                  )
                )} 
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
