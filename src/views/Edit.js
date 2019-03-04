import React from 'react';
import {Redirect} from 'react-router-dom'
import BindingForm from '../components/BindingForms';
import {UserContext} from '../components/contexts/userContext';
import staticData from '../constants/staticData.js'

const Edit =(props) =>{
    const {isAdmin, edit}=props;
    const handelSubmit = (ev, data)=>{
        ev.preventDefault();
        const dogData = {
            name:data.name,
            breed:data.breed || 'mix',
            age:data.age,
            'image-url':data['image-url'],
            status:data.status || 'available',
            story:data.story
        };
        Edit(dogData);
    }
    const breeds = staticData.breeds;
    const statuses= staticData.statuses;

    if(!isAdmin){
       return <Redirect to="/"/>
    }
    return (

        <main className='site-content admin'>
            <section className="site-Edit">
                <BindingForm formType='Edit' onSubmit={handelSubmit}>
                   <input 
                        type="text" 
                        id="name" 
                        name="name"
                        minLength="2"
                        maxLength="10"
                        required
                    />
                    <select 
                        id="breed" 
                        name="breed"
                        defaultValue="mix"
                        required
                    >
                        {breeds.map(breed=>(<option key={breed}>{breed}</option>))}
                    </select>

                    <input 
                        type="number" 
                        id="age" 
                        name="age"
                        min="0"
                        max="15"
                        required
                    />
                    <input 
                        type="imageUrl" 
                        id="image-url" 
                        name="image-url"
                        pattern="(http)?s?:?(\/\/[^']*\.(?:png|jpg|jpeg|gif|png|svg))"
                        required
                    />
                    <select 
                        id="status" 
                        name="status"
                        defaultValue="available"
                        required
                    >
                        {statuses.map(status=>(<option key={status}>{status}</option>))}
                    </select>
                    <textarea
                        type="text" 
                        id="story" 
                        name="story"
                        required
                    />
                </BindingForm>
            </section>
        </main>
    )
    
}

const EditWithContext =(props)=> {
    return (
        <UserContext.Consumer>
            {
                ({isAdmin})=>(
                    <Edit
                        {...props}
                        isAdmin={isAdmin}
                    />
                )
            }
        </UserContext.Consumer>
    )
}

export {Edit}
export default EditWithContext;