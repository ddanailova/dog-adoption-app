import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {UserContext} from '../components/contexts/userContext';

const AutherizedRoute =(props)=>{
    const {criteria, ...otherProps}=props;
    return(
            criteria?(
                <Route {...otherProps}/>
            ):(
                <Redirect to='/'/>
            )
        );
}

const AdminRoute =(props)=>{
    return(
        <UserContext.Consumer>
        {
            ({isAdmin})=>{
                return (
                    <AutherizedRoute
                        {...props} 
                        criteria={isAdmin}
                    />
                )
            }
        }
        </UserContext.Consumer>
    );
}

const UserRoute =(props)=>{
    return(
        <UserContext.Consumer>
        {
            ({username})=>{
                return (
                    <AutherizedRoute
                        {...props} 
                        criteria={username}
                    />
                )
            }
        }
        </UserContext.Consumer>
    );
}

const AnonimusRoute=(props)=>{
    return(
        <UserContext.Consumer>
        {
            ({username})=>{
                return (
                    <AutherizedRoute
                        {...props} 
                        criteria={!username}
                    />
                )
            }
        }
        </UserContext.Consumer>
    );
}

export {AdminRoute, UserRoute, AnonimusRoute};
export default AutherizedRoute;