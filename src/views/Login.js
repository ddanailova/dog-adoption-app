import React from 'react';
import {Redirect} from 'react-router-dom'
import BindingForm from '../components/BindingForms';
import {UserContext} from '../components/contexts/userContext';
import { toast } from 'react-toastify';

const Login =(props) =>{
    const {username, login}=props;
    const handelSubmit = (ev, data)=>{
        ev.preventDefault();
        if(!Object.keys(data.errors).length){
            toast.error('Please fill in all form fields!' , {
                closeButton: false,
                autoClose:6000
            });
        }else{
            const userData = {
                username:data.username,
                password:data.password
            };
            login(userData);
        }
    }

    if(username){
       return <Redirect to="/"/>
    }
    return (

        <main className='site-content guest'>
            <section className="site-login">
                <BindingForm formType='login' onSubmit={handelSubmit}>
                   <input 
                        type="text" 
                        id="username" 
                        name="username"
                        minLength="3"
                        maxLength="15"
                    />
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                        minLength="5"
                        maxLength="15"
                    />
                </BindingForm>
            </section>
        </main>
    )
    
}

const LoginWithContext =(props)=> {
    return (
        <UserContext.Consumer>
            {
                ({username})=>(
                    <Login
                        {...props}
                        username={username}
                    />
                )
            }
        </UserContext.Consumer>
    )
}

export {Login}
export default LoginWithContext;