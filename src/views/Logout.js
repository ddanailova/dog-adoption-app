import React from 'react';
import {Redirect} from 'react-router-dom';
import {UserContext} from '../components/contexts/userContext';

const LogoutWithContext=(props)=>{
    return(
        <UserContext.Consumer>
        {
            ({username})=>{
                if(username){
                    props.logout();
                }
                return <Redirect to="/"/>
            }
        }
        </UserContext.Consumer>
    )
}

export default LogoutWithContext;