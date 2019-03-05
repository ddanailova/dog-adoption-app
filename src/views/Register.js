import React from 'react';
import {Redirect} from 'react-router-dom';
import {UserContext} from '../components/contexts/userContext';
import BindingForm from '../components/BindingForms';
import { toast } from 'react-toastify';

const Register =(props)=> {
    const {username, register}=props;

    const handelSubmit = (ev, data)=>{
        ev.preventDefault();

        if(!Object.keys(data.errors).length){
            toast.error('Please fill in all form fields!' , {
                closeButton: false,
                autoClose:6000
            });
        }else if(data.password !== data['repeat-password']){
            toast.error('Both passwords should match!' , {
                closeButton: false,
                autoClose:6000
            });
        }else{
            const userData = {
                username:data.username,
                password:data.password,
                'full-name':data['full-name'],
                email:data.email,
                phone:data.phone
            };
            register(userData);
        }
    }

    if(username){
        return <Redirect to='/'/>
    }

    return (
        <main className='site-content guest'>
            <section className="site-register">
                <BindingForm formType='register' onSubmit={handelSubmit}>
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
                    <input
                        type="password" 
                        id="repeat-password" 
                        name="repeat-password"
                        minLength="5"
                        maxLength="15"
                    />
                    <input
                        type="text" 
                        id="full-name" 
                        name="full-name"
                        minLength="3"
                        maxLength="25"
                    />
                    <input
                        type="email" 
                        id="email" 
                        name="email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    />
                    <input
                        type="tel" 
                        id="phone" 
                        name="phone"
                    />
                </BindingForm>
            </section>
        </main>
    )

}

const RegisterWithContext =(props)=> {
    return (
        <UserContext.Consumer>
            {
                ({username})=>(
                    <Register
                        {...props}
                        username={username}
                    />
                )
            }
        </UserContext.Consumer>
    )
}

export {Register}
export default RegisterWithContext;