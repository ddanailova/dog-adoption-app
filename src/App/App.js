import React, { Component } from 'react';
import {Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomeWithContext from '../views/Home';
import Login from '../views/Login';
import Register from '../views/Register';
import Logout from '../views/Logout';
import CatalogWithContext from '../views/Catalog';
import Details from '../views/Details';
import Profile from '../views/Profile';
import Dashboard from '../views/Dashboard';
import Create from '../views/Create';
import Edit from '../views/Edit';
import NotFound from '../views/NotFound';

import HeaderWithContext from '../components/Header';
import Footer from '../components/Footer';
import {AdminRoute,UserRoute,AnonimusRoute} from '../components/AuthorizedRout'
import {defaultUserState, UserContext} from '../components/contexts/userContext';

import UserService from '../services/userService';
import DogService from '../services/dogService';
import ApplicationService from '../services/applicationService';


import './App.css';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      user:defaultUserState,
      redirectToHome:false
    }

    this.updateUser=this.updateUser.bind(this);
    this.register=this.register.bind(this);
    this.login=this.login.bind(this);
    this.logout=this.logout.bind(this);
    this.addDogToUserWatched=this.addDogToUserWatched.bind(this);
    this.createDog=this.createDog.bind(this)
    this.removeDog=this.removeDog.bind(this)
    this.createApplication=this.createApplication.bind(this);
  }
  
  static UserService= new UserService();
  static DogService= new DogService();
  static ApplicationService = new ApplicationService();

  displayToastMessage(type, message, closingTime){
    if(type==='error'){
      toast.error(message , {
        closeButton: false,
        autoClose: closingTime
      });
    }else if(type==='success'){
      toast.success(message, {
        closeButton: false,
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: closingTime
      });
    }else if(type==='info'){
      toast.info(message, {
        closeButton: false,
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: closingTime
      });
    }
  }

  // for the user
  updateUser =(userData)=>{
    this.setState({user:userData})
  }

  register(userData){
    App.UserService.register(userData).then((resBody)=>{
      if(resBody.error){
        this.displayToastMessage('error', resBody.description, 6000 );
        }else{
          let isAdmin = App.UserService.isUserAdmin(resBody);
          App.UserService.storeUserData(resBody, isAdmin);
          this.displayToastMessage('success', `Registration successful! Welcome, ${resBody.username}!`, 3000 );
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
      this.displayToastMessage('error', 'Sorry, something went wrong with the server. We are working on it!', 6000 );
    })
  }

  login(userData){
    App.UserService.login(userData)
    .then(resBody=>{ 
      if(resBody.error){
        this.displayToastMessage('error', resBody.description, 6000 );
      }else{
        let isAdmin = App.UserService.isUserAdmin(resBody);
        App.UserService.storeUserData(resBody, isAdmin);
        this.displayToastMessage('success', `Login successful! Welcome back, ${resBody.username}!`, 3000 );
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
      this.displayToastMessage('error', 'Sorry, something went wrong with the server. We are working on it!', 6000 );
    })
  }

  logout(){
    App.UserService.logout()
    .then(resBody=>{
      if(resBody.error){
        this.displayToastMessage('error', resBody.description, 6000 );
        }else{
        App.UserService.clearStoredData();
        this.displayToastMessage('success', 'Logout successful!', 3000 );
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
      this.displayToastMessage('error', 'Sorry, something went wrong with the server. We are working on it!', 6000 );
    })
  }

  getUserById(id){
    App.UserService.getUserById(id)
    .then(resBody=>{
        if(resBody.error){
          this.displayToastMessage('error', resBody.description, 6000 );
        }else{
            this.setState({
                userDetails:resBody,
                isLoading:false
            })
        }
    })
    .catch(err=>{
        console.log(err);
        this.setState({
            isLoading:false
        });
        this.displayToastMessage('error', 'Sorry, something went wrong with the server. We are working on it!', 6000 );
    })
  }

  addDogToUserWatched(id, dogData){
    App.UserService.getUserById(id)
    .then(resBody=>{
        if(resBody.error){
          this.displayToastMessage('error', resBody.description, 6000 );
        }else{
          for (const dog of resBody.watched) {
            if(dog._id === dogData._id){
              this.displayToastMessage('info', `This dog is already in your watched list`, 3000 );
              return
            }
          }
          resBody.watched.push(dogData)
          App.UserService.update(resBody._id, resBody)
          .then(resBody=>{
            if(resBody.error){
              this.displayToastMessage('error', resBody.description, 6000 );
            }else{
              this.displayToastMessage('success', `Successfully added ${dogData.name} to your Watch List!`, 3000 );
            }
          })
        }
    })
    .catch(err=>{
        console.log(err);
        this.displayToastMessage('error', 'Sorry, something went wrong with the server. We are working on it!', 6000 );
    })
  }

  //for the dogs
  getAllDogs(filter){
    App.DogService.getAll(filter)
        .then(resBody=>{
            if(resBody.error){
              this.displayToastMessage('error', resBody.description, 6000 );
            }else{
                this.setState({
                    dogs:resBody,
                    isLoading:false
                })
            }
          }
        ).catch(err=>{
            console.log(err);
            this.setState({
                isLoading:false
            });
          this.displayToastMessage('error', 'Sorry, something went wrong with the server. We are working on it!', 6000 );
      })
  }

  getDogById(id){
    App.DogService.getById(id)
    .then(resBody => {
        if (resBody.error) {
          this.displayToastMessage('error', resBody.description, 6000 );
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
              isLoading:false
            })
        }
    })
    .catch(err => {
        console.log(err);
        this.displayToastMessage('error', 'Sorry, something went wrong with the server. We are working on it!', 6000 );
    })
  }

  createDog(dogData){
    App.DogService.create(dogData)
    .then(resBody=>{
      if(resBody.error){
        this.displayToastMessage('error', resBody.description, 6000 );
      }else{
        this.displayToastMessage('success', `You have successfully created a card for ${resBody.name}!`, 3000 );
        this.setState({
          redirectToHome:true
        });
      }
    }).catch(err=>{
      console.log(err);
      this.displayToastMessage('error', 'Sorry, something went wrong with the server. We are working on it!', 6000 );
    })
  }

  editDog(id,dogData){
    App.DogService.update(id,dogData)
    .then(resBody=>{
      if(resBody.error){
        this.displayToastMessage('error', resBody.description, 6000 );
      }else{
        this.displayToastMessage('success', `You have successfully edited a card for ${resBody.name}!`, 3000 );
        this.setState({
          redirect:true
        });
      }
    }).catch(err=>{
      console.log(err);
      this.displayToastMessage('error', 'Sorry, something went wrong with the server. We are working on it!', 6000 );
    })
  }

  removeDog(id){
    App.DogService.remove(id)
    .then(resBody=>{
      if(resBody.error){
        this.displayToastMessage('error', resBody.description, 6000 );
      }else{
        App.ApplicationService.getAll(`"dogId":"${id}"`).then(resBody=>{
          if(resBody.error){
            this.displayToastMessage('error', resBody.description, 6000 );
          }else{
            let hadIssue=false;
            resBody.forEach(app=>{
              App.ApplicationService.update(app._id, {...app, status:"remove from database"})
              .then(()=>{
                if(resBody.error){
                  hadIssue=true;
                  this.displayToastMessage('error', resBody.description, 6000 );
                }
              })
            });

            if(!hadIssue){
              this.displayToastMessage('success', 'You have successfully deleted the card!', 3000 );
            }
          }
        })
      }
    }).catch(err=>{
      console.log(err);
      this.displayToastMessage('error', 'Sorry, something went wrong with the server. We are working on it!', 6000 );
    })
  }

  //for applications 
  createApplication(data, dogDetails){
    App.ApplicationService.create(data)
    .then(resBody=>{
      if(resBody.error){
        this.displayToastMessage('error', resBody.description, 6000 );
      }else{
        App.DogService.update(data.dogId,{...dogDetails, status:'processing'})
          .then(resBody=>{
            if(resBody.error){
              this.displayToastMessage('error', resBody.description, 6000 );
            }else{
              this.displayToastMessage('success', 'Your application has been sent. We will get in touch with you shortly for more details.', 6000 );
            }
          }
        );
      }
    }).catch(err=>{
      console.log(err);
      this.displayToastMessage('error', 'Sorry, something went wrong with the server. We are working on it!', 6000 );
    })
  }

  render() {
    const {user}=this.state;
    return (
      <UserContext.Provider value={user}>
        <div className="site">
          <HeaderWithContext/>
          <ToastContainer className='toast-container'/>
            <Switch>
              <Route exact 
                path="/" 
                component={HomeWithContext}
              />
              <AnonimusRoute 
                path='/login' 
                render={(props)=><Login {...props} 
                  login={this.login}
                />}
              />
              <AnonimusRoute 
                path='/signup' 
                render={(props)=><Register {...props} 
                  register={this.register}
                />} 
              />
              <UserRoute 
                path='/logout' 
                render={(props)=><Logout {...props} 
                  logout={this.logout}
                />} 
              />
              <UserRoute
                path='/catalog'
                render={(props)=><CatalogWithContext {...props} 
                  getAllDogs={this.getAllDogs}
                  displayToastMessage={this.displayToastMessage}
                />} 
              />
              <UserRoute 
                path='/details/:id' 
                render={(props)=><Details {...props}  
                  removeDog={this.removeDog}   
                  getDogById={this.getDogById}   
                  createApplication={this.createApplication}  
                  editDog={this.editDog}
                  addDogToUserWatched={this.addDogToUserWatched}
                  displayToastMessage={this.displayToastMessage}
              />}
              />
              <UserRoute
                path='/profile/:id' 
                render={(props)=><Profile {...props} 
                  getUserById={this.getUserById}
                  displayToastMessage={this.displayToastMessage}
              />}
              />
              <AdminRoute
                path='/dashboard' 
                render={(props)=><Dashboard {...props} 
                  displayToastMessage={this.displayToastMessage}
                />} 
              />
              <AdminRoute
                path='/create' 
                render={(props)=><Create {...props} 
                  createDog={this.createDog}
                  redirectToHome={this.state.redirectToHome}
                />} 
              />
              <AdminRoute 
                path='/edit/:id' 
                render={(props)=><Edit {...props} 
                  editDog={this.editDog} 
                  getDogById={this.getDogById}
                  displayToastMessage={this.displayToastMessage}
                />} 
              />
              <Route
                component ={NotFound}
              />
            </Switch>
          <Footer/>
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;