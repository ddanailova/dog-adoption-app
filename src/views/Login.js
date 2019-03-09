import React from 'react';
import BindingForm from '../components/BindingForms';
import { toast } from 'react-toastify';

const Login =(props) =>{
    const {login}=props;
    const handelSubmit = (ev, data)=>{
        ev.preventDefault();
        let hasAllValues=true;
        for (const key in data) {
            if (!data[key]) {
                hasAllValues=false;
                break;
            }
        }
        if(!Object.keys(data.errors).length  || !hasAllValues){
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

export default Login;