import React from 'react';
import {Redirect} from 'react-router-dom'
import { toast } from 'react-toastify';

import BindingForm from '../components/BindingForms';
import staticData from '../constants/staticData.js';

const Create =(props)=>{
    const {createDog, redirectToHome}=props;
    const breeds = staticData.breeds;
    const statuses= staticData.statuses;

    const handelSubmit=(ev, data)=>{
        ev.preventDefault();
        let hasAllValues=true;
        for (const key in data) {
            if (!data[key]) {
                hasAllValues=false;
                break;
            }
        }
        if(!Object.keys(data.errors).length || !hasAllValues){
            toast.error('Please fill in all form fields!' , {
                closeButton: false,
                autoClose:6000
            }
        )}else{
                const dogData = {
                    name:data.name,
                    breed:data.breed || 'mix',
                    age:data.age,
                    'image-url':data['image-url'],
                    status:data.status || 'available',
                    story:data.story
                };
            createDog(dogData);
        }
    }

    if(redirectToHome){
        return <Redirect to="/"/>
     }
     return (
         <main className='site-content admin'>
             <section className="site-create">
                 <BindingForm 
                     formType='create' 
                     onSubmit={handelSubmit}
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
                         defaultValue=''
                     >
                        <option> </option>
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
                         defaultValue=''
                     >
                        <option></option>
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

export default Create;