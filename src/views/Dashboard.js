import React, {Component}from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../components/contexts/userContext';
import LinkButton from './../components/LinkButton';

class Dashboard extends Component{
    constructor(props){
        super(props);

        this.state ={
            applications:[],
            isLoading:true,
            hasChanged:false
        }

        this.getAllApplications=this.props.getAllApplications.bind(this);
        this.changeAplication=this.props.changeAplication.bind(this);
    }

    componentDidMount(props){
        this.getAllApplications()
    }

    handleClick=(ev, data)=>{
        const buttonType =ev.target.text.toLowerCase();

        if(buttonType==='approve'){
            //appId, appData, dogId, dogStatus
            const newAppData = {...data, status:'approved'}
            this.changeAplication(data._id, newAppData, data.dogId, 'adopted');
        }else if(buttonType==='cancel'){
            //appId, appData, dogId, dogStatus
            const newAppData = {...data, status:'canceled'}
            this.changeAplication(data._id, newAppData, data.dogId, 'available');
        }
    }

    render(){
        const {applications, isLoading}=this.state;
        return(
            <main className='site-content admin'>
                <section className="site-index">
                    <h1>Adoption applications</h1>
                    {
                        isLoading?(
                            <h3><i className="fas fa-paw"></i> Loading ........ <i className="fas fa-paw"></i></h3>
                        ):(
                            (applications.length===0)?(
                                <h3><i className="fas fa-paw"></i> There are no dogs adoption applications at the moment. <i className="fas fa-paw"></i></h3>
                            ):(
                                <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Dog ID</th>
                                        <th>User ID</th>
                                        <th>Status</th>
                                        <th>Update</th>
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
                                                <LinkButton 
                                                    extraClassNames='button-reverse' 
                                                    buttonType='approve' 
                                                    text='approve'
                                                    onClick={(ev)=>this.handleClick(ev, application)}
                                                    />
                                                <LinkButton 
                                                    extraClassNames='button-reverse cancel'
                                                    buttonType='cancel' 
                                                    text='cancel'
                                                    onClick={(ev)=>this.handleClick(ev, application)}
                                                />
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

// const DashboardWithContext =(props)=> {
//     return (
//         <UserContext.Consumer>
//             {
//                 ({isAdmin})=>(
//                     <Dashboard
//                         {...props}
//                         isAdmin={isAdmin}
//                     />
//                 )
//             }
//         </UserContext.Consumer>
//     )
// }

// export {Dashboard}
export default Dashboard;