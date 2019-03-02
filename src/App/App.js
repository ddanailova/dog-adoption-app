import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import userService from '../services/userService';

import HomeWithContext from '../views/Home';
import LoginWithContext from '../views/Login';
import RegisterWithContext from '../views/Register';
import LogoutWithContext from '../views/Logout';
import Catalog from '../views/Catalog';
import Details from '../views/Details';
import Dashboard from '../views/Dashboard';
import NotFound from '../views/NotFound';

import HeaderWithContext from '../components/Header';
import Footer from '../components/Footer';
import {defaultUserState, UserContext} from '../components/contexts/userContext';

import './App.css';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      user:defaultUserState,
    }
  }
  
  static authService= new userService();

  componentDidMound(){
    
  }

  updateUser =(userData)=>{
    this.setState({userData})
  }

  register =(userData)=>{

    App.authService.register(userData).then((resBody)=>{
      if(resBody.error){
          toast.error(resBody.description , {
            closeButton: false,
            autoClose: 6000
          });
        }else{
          let isAdmin = App.authService.isUserAdmin(resBody);
          App.authService.storeUserData(resBody, isAdmin);
          
          toast.success(`Registration successful! Welcome, ${resBody.username}`, {
            closeButton: false,
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000
          });

          this.setState({
            user:{
              username:resBody.username,
              isAdmin:isAdmin,
              updateUser:this.updateUser
            }
        })
      }
    }).catch(err=>{
      console.log(err);
      toast.error('Sorry, something went wrong with the server. We are working on it!', {
          closeButton: false,
          autoClose: false
      })
    })
  }

  login=(userData)=>{
    App.authService.login(userData)
    .then(resBody=>{ 
      if(resBody.error){
        toast.error(resBody.description , {
          closeButton: false,
          autoClose: 6000
        });
      }else{
        let isAdmin = App.authService.isUserAdmin(resBody);
        App.authService.storeUserData(resBody, isAdmin);
  
        toast.success(`Login successful! Welcome back, ${resBody.username}`, {
          closeButton: false,
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000
        });

        this.setState( {
          user:{
            username:resBody.username,
            isAdmin:isAdmin,
            updateUser:this.updateUser
          }
        })
      }
    }).catch(err=>{
      console.log(err);
      toast.error('Sorry, something went wrong with the server. We are working on it!', {
          closeButton: false,
          autoClose: false
      })
    })
  }

  logout = () => {
    App.authService.logout()
    .then(response=>{
      if(response.error){
          toast.error(response.description , {
            closeButton: false,
            autoClose: 6000
          });
        }else{
        App.authService.clearStoredData();
        toast.success('Logout successful! Come back soon!', {
          closeButton: false,
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000 
        });
        this.setState({
          user:{
            username:null,
            isAdmin:false,
            updateUser:defaultUserState.updateUser
          }
        })
      }
    }).catch(err=>{
      console.log(err);
      toast.error('Sorry, something went wrong with the server. We are working on it!', {
          closeButton: false,
          autoClose: false
      })
    })
  }

  render() {
    const {user, dog}=this.state;
    return (
      <Router>
        <UserContext.Provider value={user}>
          <div className="site">
            <HeaderWithContext />
            <ToastContainer className='toast-container'/>
              <Switch>
                <Route exact 
                  path="/" 
                  component={HomeWithContext}
                />
                <Route 
                  path='/login' 
                  render={(props)=><LoginWithContext {...props} login={this.login}/>}
                />
                <Route 
                  path='/signup' 
                  render={(props)=><RegisterWithContext {...props} register={this.register}/>} 
                />
                <Route 
                path='/logout' 
                render={(props)=><LogoutWithContext {...props} logout={this.logout}/>} 
                />
                <Route 
                  path='/catalog' 
                  render={(props)=><Catalog {...props} selectDog={this.selectDog}/>} 
                />
                <Route 
                  path='/details/:id' 
                  component={Details}
                />
                <Route 
                  path='/dashboard' 
                  component={Dashboard} 
                />
                <Route
                  component ={NotFound}
                />
              </Switch>
            <Footer/>
          </div>
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;
