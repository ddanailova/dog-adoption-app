import React, {Component, Fragment}from 'react';
import {Link} from 'react-router-dom';
import LinkButton from '../components/LinkButton';
import ApplicationService from './../services/applicationService';
import DogService from './../services/dogService';
import staticData from './../constants/staticData';

class Dashboard extends Component{
    constructor(props){
        super(props);

        this.state ={
            applications:[],
            isLoading:false,
        }

        this.getAllApplications=this.getAllApplications.bind(this);
        this.changeApplication=this.changeApplication.bind(this);
        this.removeApplication=this.removeApplication.bind(this);
        this.displayToastMessage=this.props.displayToastMessage.bind(this);
    }

    static ApplicationService = new ApplicationService();
    static DogService= new DogService();
    static tableColumns=staticData.dashboardColumns;

    componentDidMount(props){
        this.setState({isLoading:true},()=>this.getAllApplications());
    }

    getAllApplications(){
        Dashboard.ApplicationService.getAll('',{type:"_kmd.ect",value: -1})
          .then(resBody=>{
            if(resBody.error){
              this.displayToastMessage('error', resBody.description, 6000 );
            }else{
              this.setState({
                applications:resBody,
                isLoading:false
              })
            }
          }).catch(err=>{
            console.log(err);
            this.displayToastMessage('error', 'Sorry, something went wrong with the server. We are working on it!', 6000 );
          }
        )
      }

    changeApplication(appId, appData, dogId, dogStatus){
        Dashboard.ApplicationService.update(appId, appData)
        .then(resBody=>{
          if(resBody.error){
            this.displayToastMessage('error', resBody.description, 6000 );
          }else{
            Dashboard.DogService.getById(dogId)
              .then(resBody=>{
                if(resBody.error){
                  this.displayToastMessage('error', resBody.description, 6000 );
                }else{
                    Dashboard.DogService.update(dogId,{...resBody, status:dogStatus})
                  .then(resBody=>{
                    if(resBody.error){
                      this.displayToastMessage('error', resBody.description, 6000 );
    
                    }else{
                      this.displayToastMessage('success', `The application has been ${appData.status}ed`, 6000 );
    
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
          this.displayToastMessage('error', 'Sorry, something went wrong with the server. We are working on it!', 6000 );
        })
      }
    
      removeApplication(id){
        Dashboard.ApplicationService.remove(id)
        .then(resBody=>{
          if(resBody.error){
            this.displayToastMessage('error', resBody.description, 6000 );
          }else{
            this.displayToastMessage('success','The application has been removed from the database!', 3000 );
            this.setState({
              isLoading:true
            }, ()=>this.getAllApplications())
          }
    
        }).catch(err=>{
          console.log(err);
          this.displayToastMessage('error', 'Sorry, something went wrong with the server. We are working on it!', 6000 );
        })
      }

    render(){
        const {applications, isLoading}=this.state;
        return(
            <main className='site-content admin'>
                <section className="site-index">
                    <h1>Adoption applications</h1>
                    {
                        isLoading?(
                            <h3>
                                <i className="fas fa-paw"></i> 
                                Loading ........ 
                                <i className="fas fa-paw"></i>
                            </h3>
                        ):(
                            (applications.length===0)?(
                                <h3>
                                    <i className="fas fa-paw"></i> 
                                    There are no dogs adoption applications at the moment. 
                                    <i className="fas fa-paw"></i>
                                </h3>
                            ):(
                                <table>
                                <thead>
                                    <tr>
                                    {
                                        Dashboard.tableColumns.map(column=><th key={column}>{column}</th>)
                                    }
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    applications.map((application, i)=>
                                        <tr key={application._id}>
                                            <td>{i+1}</td>
                                            <td><Link to={`/details/${application.dogId}`}>{application.dogId}</Link></td>
                                            <td><Link to={`/profile/${application.userId}`}>{application.userId}</Link></td>
                                            <td>{application.status}</td>
                                            <td>
                                            {   
                                                (application.status==='remove from database')?(
                                                    <LinkButton 
                                                    extraClassNames='button-reverse cancel' 
                                                    buttonType='remove' 
                                                    text='remove'
                                                    details={application}
                                                    removeApplication={this.removeApplication}
                                                />
                                                ):(
                                                    <Fragment>
                                                        <LinkButton 
                                                            extraClassNames='button-reverse' 
                                                            buttonType='approve' 
                                                            text='approve'
                                                            details={application}
                                                            changeApplication={this.changeApplication}
                                                        />
                                                        <LinkButton 
                                                            extraClassNames='button-reverse cancel'
                                                            buttonType='cancel' 
                                                            text='cancel'
                                                            details={application}
                                                            changeApplication={this.changeApplication}
                                                        />
                                                    </Fragment>
                                                )
                                            }
                                            </td>
                                        </tr>
                                    )
                                }

                                </tbody>
                            </table>
                            )
                        )
                    }
                </section>
            </main>
        );
    }
}

export default Dashboard;