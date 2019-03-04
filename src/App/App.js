import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import userService from '../services/userService';
import dogService from '../services/dogService';

import HomeWithContext from '../views/Home';
import LoginWithContext from '../views/Login';
import RegisterWithContext from '../views/Register';
import LogoutWithContext from '../views/Logout';
import CreateWithContext from '../views/Create';
import EditWithContext from '../views/Create';
import Catalog from '../views/Catalog';
import DetailsWithContext from '../views/Details';
import ProfileWithDogContext from '../views/Profile';
import Dashboard from '../views/Dashboard';
import NotFound from '../views/NotFound';

import HeaderWithContext from '../components/Header';
import Footer from '../components/Footer';
import {defaultUserState, UserContext} from '../components/contexts/userContext';
import {defaultDogState, DogContext} from '../components/contexts/dogContext';

import './App.css';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      user:defaultUserState,
      dogs:{
        checkedDogs:defaultDogState.checkedDogs,
        updateCheckedDogs:this.updateCheckedDogs
      }
    }
  }
  
  static authService= new userService();
  static dogService= new dogService();

  componentWillUnmount(){
    this.updateCheckedDogs();
  }

    // for the user
  updateUser =(userData)=>{
    this.setState({user:userData})
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
          },
          // dogs:{
          //   checkedDogs:defaultDogState.checkedDogs,
          //   updateCheckedDogs:this.updateCheckedDogs
          // }
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

  //for the dogs

  updateCheckedDogs =(dogData)=>{
    this.setState(prevState=>(
      {
        dogs:{
          checkedDogs:[...prevState.dogs.checkedDogs, dogData],
          updateCheckedDogs:this.updateCheckedDogs
        }
      }
    ));
  }

  create =(dogData)=>{
    App.dogService.create(dogData)
    .then(resBody=>{
      if(resBody.error){
        toast.error(resBody.description , {
          closeButton: false,
          autoClose: 6000
        });
      }else{
        toast.success(`You have successfully created a card for ${resBody.name}!`, {
          closeButton: false,
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000
        });
      }
    }).catch(err=>{
      console.log(err);
      toast.error('Sorry, something went wrong with the server. We are working on it!', {
          closeButton: false,
          autoClose: false
      })
    })
  }

  remove=(id)=>{
    App.dogService.remove(id)
    .then(resBody=>{
      if(resBody.error){
        toast.error(resBody.description , {
          closeButton: false,
          autoClose: 6000
        });
      }else{
        toast.success(`You have successfully deleted ${resBody.name}'s card!`, {
          closeButton: false,
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000
        });
      }
    }).catch(err=>{
      console.log(err);
      toast.error('Sorry, something went wrong with the server. We are working on it!', {
          closeButton: false,
          autoClose: false
      })
    })
  }

  edit=()=>{

  }

  render() {
    const {user, dogs}=this.state;
    return (
      <Router>
        <UserContext.Provider value={user}>
        <DogContext.Provider value={dogs}>       
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
                  path='/create' 
                  render={(props)=><CreateWithContext {...props} create={this.create}/>} 
                />
                <Route 
                path='/edit' 
                render={(props)=><EditWithContext {...props} create={this.edit}/>} 
              />
                <Route 
                  path='/details/:id' 
                  render={(props)=><DetailsWithContext {...props} remove={this.remove} getById={this.getById}/>}
                />
                <Route 
                path='/profile' 
                component={ProfileWithDogContext}
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
          </DogContext.Provider>
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;
