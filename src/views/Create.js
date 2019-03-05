import React from 'react';
import {Redirect} from 'react-router-dom'
import { toast } from 'react-toastify';

import BindingForm from '../components/BindingForms';
import {UserContext} from '../components/contexts/userContext';
import staticData from '../constants/staticData.js';


const Create =(props) =>{
    const {isAdmin, create}=props;
    const breeds = staticData.breeds;
    const statuses= staticData.statuses;
    let initialState={
        name:'',
        breed:'mix',
        age:'',
        'image-url':'',
        status:'available',
        story:''
    }
    const handelSubmit = (ev, data)=>{
        ev.preventDefault();
        if(!Object.keys(data.errors).length){
            toast.error('Please fill in all form fields!' , {
                closeButton: false,
                autoClose:6000
            })}else{
                const dogData = {
                    name:data.name,
                    breed:data.breed || 'mix',
                    age:data.age,
                    'image-url':data['image-url'],
                    status:data.status || 'available',
                    story:data.story
                };
                create(dogData);
        }
    }

    if(!isAdmin){
       return <Redirect to="/"/>
    }
    return (
        <main className='site-content admin'>
            <section className="site-create">
                <BindingForm 
                    formType='create' 
                    onSubmit={handelSubmit}
                    initialState={initialState}
                >
                   <input 
                        type="text" 
                        id="name" 
                        name="name"
                        minLength="2"
                        maxLength="10"
                    />
                    <select 
                        id="breed" 
                        name="breed"
                    >
                        {breeds.map(breed=>(<option key={breed}>{breed}</option>))}
                    </select>

                    <input 
                        type="number" 
                        id="age" 
                        name="age"
                        min="0"
                        max="15"
                    />
                    <input 
                        type="text" 
                        id="image-url" 
                        name="image-url"
                        pattern="(http)?s?:?(\/\/[^']*\.(?:png|jpg|jpeg|gif|png|svg))"
                    />
                    <select 
                        id="status" 
                        name="status"
                    >
                        {statuses.map(status=>(<option key={status}>{status}</option>))}
                    </select>
                    <textarea
                        type="text" 
                        id="story" 
                        name="story"
                        minLength="0"
                        maxLength="500"
                    />
                </BindingForm>
            </section>
        </main>
    )
    
}

const CreateWithContext =(props)=> {
    return (
        <UserContext.Consumer>
            {
                ({isAdmin})=>(
                    <Create
                        {...props}
                        isAdmin={isAdmin}
                    />
                )
            }
        </UserContext.Consumer>
    )
}

export {Create}
export default CreateWithContext;