import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

import UserService from '../services/userService';
import DogService from '../services/dogService';
import AplicationService from '../services/applicationService';

import {defaultUserState, UserContext} from '../components/contexts/userContext';

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
          
          toast.success(`Registration successful! Welcome, ${resBody.username}!`, {
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
  
        toast.success(`Login successful! Welcome back, ${resBody.username}!`, {
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
                autoClose: 6000
            })
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
                    autoClose: 6000
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
                autoClose: 6000
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
              isLoading:false
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
        App.ApplicationService.getAll(`"dogId":"${id}"`).then(resBody=>{
          if(resBody.error){
            toast.error(resBody.description , {
              closeButton: false,
              autoClose: 6000
            });
          }else{
            let hadIssue=false;
            resBody.forEach(app=>{
              App.ApplicationService.update(app._id, {...app, status:"remove from database"})
              .then(()=>{
                if(resBody.error){
                  hadIssue=true;
                  toast.error(resBody.description , {
                    closeButton: false,
                    autoClose: 6000
                  });
                }
              })
            });

            if(!hadIssue){
              toast.success(`You have successfully deleted the card!`, {
                closeButton: false,
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000
              });
            }
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

  //for applications 
  getAllApplications(){
    App.ApplicationService.getAll('',{type:"_kmd.ect",value: -1})
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
        App.DogService.update(data.dogId,{...dogDetails, status:'processing'})
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
            }
          }
        );
      }
    }).catch(err=>{
      console.log(err);
      toast.error('Sorry, something went wrong with the server. We are working on it!', {
          closeButton: false,
          autoClose: false
      })
    })
  }

  changeAplication(appId, appData, dogId, dogStatus){
    App.ApplicationService.update(appId, appData)
    .then(resBody=>{
      if(resBody.error){
        toast.error(resBody.description , {
          closeButton: false,
          autoClose: 6000
        });
      }else{
        App.DogService.getById(dogId)
          .then(resBody=>{
            if(resBody.error){
              toast.error(resBody.description , {
                closeButton: false,
                autoClose: 6000
              });
            }else{
              App.DogService.update(dogId,{...resBody, status:dogStatus})
              .then(resBody=>{
                if(resBody.error){
                  toast.error(resBody.description , {
                    closeButton: false,
                    autoClose: 6000
                  });
                }else{
                  toast.success(`The application has been ${appData.status}ed`, {
                    closeButton: false,
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000
                  });
                  this.setState({
                    isLoading:true
                  }, ()=>this.getAllApplications())
                }
              });
            }
          }
        )
      }
    }).catch(err=>{
      console.log(err);
      toast.error('Sorry, something went wrong with the server. We are working on it!', {
          closeButton: false,
          autoClose: false
      })
    })
  }

  removeApplication(id){
    App.ApplicationService.remove(id)
    .then(resBody=>{
      if(resBody.error){
        toast.error(resBody.description , {
          closeButton: false,
          autoClose: 6000
        });
      }else{
        toast.success(`The application has been removed from the database!`, {
          closeButton: false,
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000
        });
        this.setState({
          isLoading:true
        }, ()=>this.getAllApplications())
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
                  />} 
                />
                <UserRoute 
                path='/details/:id' 
                render={(props)=><Details {...props}  
                removeDog={this.removeDog}   
                getDogById={this.getDogById}   
                createApplication={this.createApplication}  
                editDog={this.editDog}
                />}
                />
                <UserRoute
                path='/profile/:id' 
                render={(props)=><Profile {...props} 
                getUserById={this.getUserById}
                />}
                />
                <AdminRoute
                  path='/dashboard' 
                  render={(props)=><Dashboard {...props} 
                    getAllApplications={this.getAllApplications} 
                    changeAplication={this.changeAplication}
                    removeApplication={this.removeApplication}
                  />} 
                />
                <AdminRoute
                  path='/create' 
                  render={(props)=><Create {...props} 
                    createDog={this.createDog}
                  />} 
                />
                <AdminRoute 
                  path='/edit/:id' 
                  render={(props)=><Edit {...props} 
                    editDog={this.editDog} 
                    getDogById={this.getDogById}
                  />} 
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
