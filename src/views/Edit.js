import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import BindingForm from '../components/BindingForms';
import {UserContext} from '../components/contexts/userContext';
import staticData from '../constants/staticData.js';
import { toast } from 'react-toastify';

class Edit extends Component{
    constructor(props){
        super(props);

        this.state={
            selectedItem:{},
            redirectToDetails:false
        }

        this.getDogById=this.props.getDogById.bind(this);
        this.edit=this.props.edit.bind(this);
    }

    handelSubmit = (ev, data)=>{
        ev.preventDefault();

        if(!Object.keys(data.errors).length){
            toast.error('Please fill in all form fields!' , {
                closeButton: false,
                autoClose:6000
            })}else{
        const {id}= this.props.match.params;
        const dogData = {
            name:data.name,
            breed:data.breed,
            age:data.age,
            'image-url':data['image-url'],
            status:data.status,
            story:data.story
        };
        this.edit(id,dogData);
        }
    }

    componentDidMount(){
        const {id}= this.props.match.params;
        this.getDogById(id);
    }
    render(){
        const {selectedItem, redirectToDetails}=this.state;
        const {id}= this.props.match.params;
        const {isAdmin}=this.props;
        const breeds = staticData.breeds;
        const statuses= staticData.statuses;

        if(!isAdmin){
            return <Redirect to="/"/>
         }else if(redirectToDetails){
            return <Redirect to={`/details/${id}`}/>
         }
        return(
            <main className='site-content admin'>
            <section className="site-edit">
                <BindingForm 
                    formType='edit' 
                    onSubmit={this.handelSubmit} 
                    initialState={selectedItem}
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
                    />
                </BindingForm>
            </section>
        </main>
        )
    }
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