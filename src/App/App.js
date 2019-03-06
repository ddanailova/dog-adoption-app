import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserService from '../services/userService';
import DogService from '../services/dogService';
import AplicationService from '../services/applicationService';

import HomeWithContext from '../views/Home';
import LoginWithContext from '../views/Login';
import RegisterWithContext from '../views/Register';
import LogoutWithContext from '../views/Logout';
import CreateWithContext from '../views/Create';
import EditWithContext from '../views/Edit';
import CatalogWithContext from '../views/Catalog';
import Details from '../views/Details';
import ProfileWithDogContext from '../views/Profile';
import DashboardWithContext from '../views/Dashboard';
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
    }
  }
  
  static UserService= new UserService();
  static DogService= new DogService();
  static ApplicationService = new AplicationService();

  componentWillUnmount(){
    
  }

    // for the user
  updateUser =(userData)=>{
    this.setState({user:userData})
  }

  register =(userData)=>{
    App.UserService.register(userData).then((resBody)=>{
      if(resBody.error){
          toast.error(resBody.description , {
            closeButton: false,
            autoClose: 6000
          });
        }else{
          let isAdmin = App.UserService.isUserAdmin(resBody);
          App.UserService.storeUserData(resBody, isAdmin);
          
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
    App.UserService.login(userData)
    .then(resBody=>{ 
      if(resBody.error){
        toast.error(resBody.description , {
          closeButton: false,
          autoClose: 6000
        });
      }else{
        let isAdmin = App.UserService.isUserAdmin(resBody);
        App.UserService.storeUserData(resBody, isAdmin);
  
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
    App.UserService.logout()
    .then(response=>{
      if(response.error){
          toast.error(response.description , {
            closeButton: false,
            autoClose: 6000
          });
        }else{
        App.UserService.clearStoredData();
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

  getUserById(id){
    App.UserService.getUserById(id)
    .then(resBody=>{
        if(resBody.error){
            toast.error(resBody.description, {
                closeButton: false,
                autoClose: false
            })
        }else{
            this.setState({
                userDetails:resBody,
                isLoaing:false
            })
        }
    })
    .catch(err=>{
        console.log(err);
        this.setState({
            isLoading:false
        });
        toast.error('Sorry, something went wrong with the server. We are working on it!', {
            closeButton: false,
            autoClose: false
        })
    })
  }
  //for the dogs

  getAllDogs(filter){
    App.DogService.getAll(filter)
        .then(resBody=>{
            if(resBody.error){
                toast.error(resBody.description, {
                    closeButton: false,
                    autoClose: false
                })
            }else{
                this.setState({
                    dogs:resBody,
                    isLoading:false
                })
            }
        })
        .catch(err=>{
            console.log(err);
            this.setState({
                isLoading:false
            });
            toast.error('Sorry, something went wrong with the server. We are working on it!', {
                closeButton: false,
                autoClose: false
            })
        })
  }

  getDogById(id){
    App.DogService.getById(id)
    .then(resBody => {
        if (resBody.error) {
            toast.error(resBody.description, {
                closeButton: false,
                autoClose: false
            })
        } else {

            this.setState({
                selectedItem:{
                  name:resBody.name,
                  breed:resBody.breed,
                  age:resBody.age,
                  'image-url':resBody['image-url'],
                  status:resBody.status,
                  story:resBody.story,
                  '_id':resBody._id
              },
            })
        }
    })
    .catch(err => {
        console.log(err);
        toast.error('Sorry, something went wrong with the server. We are working on it!', {
            closeButton: false,
            autoClose: false
        }
      )
    })
  }

  createDog(dogData){
    App.DogService.create(dogData)
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

        this.setState({
          redirectToHome:true
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

  editDog(id,dogData){
    App.DogService.update(id,dogData)
    .then(resBody=>{
      if(resBody.error){
        toast.error(resBody.description , {
          closeButton: false,
          autoClose: 6000
        });
      }else{
        toast.success(`You have successfully edited a card for ${resBody.name}!`, {
          closeButton: false,
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000
        });

        this.setState({
          redirect:true
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


  removeDog(id){
    App.DogService.remove(id)
    .then(resBody=>{
      if(resBody.error){
        toast.error(resBody.description , {
          closeButton: false,
          autoClose: 6000
        });
      }else{
        toast.success(`You have successfully deleted the card!`, {
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

  //for applications 

  getAllApplications(){
    App.ApplicationService.getAll()
      .then(resBody=>{
        if(resBody.error){
          toast.error(resBody.description , {
            closeButton: false,
            autoClose: 6000
          });
        }else{
          this.setState({
            applications:resBody,
            isLoading:false
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

  createApplication(data, dogDetails){
    App.ApplicationService.create(data)
    .then(resBody=>{
      if(resBody.error){
        toast.error(resBody.description , {
          closeButton: false,
          autoClose: 6000
        });
      }else{
        toast.success(`Your application has been sent. We will get in touch with you shortly for more details.`, {
          closeButton: false,
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 6000
        });
        App.DogService.update(data.dogId,{...dogDetails, status:'processing'});
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
    const {user}=this.state;
    return (
      <Router>
        <UserContext.Provider value={user}>
        {/*} <DogContext.Provider value={dogs}>  */}     
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
                  render={(props)=><CatalogWithContext {...props} getAllDogs={this.getAllDogs}/>} 
                />
                <Route 
                  path='/create' 
                  render={(props)=><CreateWithContext {...props} createDog={this.createDog}/>} 
                />
                <Route 
                path='/edit/:id' 
                render={(props)=><EditWithContext {...props} editDog={this.editDog} getDogById={this.getDogById}/>} 
              />
                <Route 
                  path='/details/:id' 
                  render={(props)=><Details {...props} removeDog={this.removeDog}  getDogById={this.getDogById} createApplication={this.createApplication} editDog={this.editDog}/>}
                />
                <Route 
                path='/profile/:id' 
                render={(props)=><ProfileWithDogContext {...props} getUserById={this.getUserById}/>}
              />
                <Route 
                  path='/dashboard' 
                  render={(props)=><DashboardWithContext {...props} getAllApplications={this.getAllApplications}/>} 
                />
                <Route
                  component ={NotFound}
                />
              </Switch>
            <Footer/>
          </div>
         {/* </DogContext.Provider> */}
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;
