import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import BindingForm from '../components/BindingForms';
import {UserContext} from '../components/contexts/userContext';
import staticData from '../constants/staticData.js';

class Edit extends Component{
    constructor(props){
        super(props);

        this.state={
            selectedItem:{},
        }

        this.getDogById=this.props.getDogById.bind(this);
    }

    handelSubmit = (ev, data)=>{
        ev.preventDefault();
        const {id}= this.props.match.params;
        const dogData = {
            name:data.name,
            breed:data.breed,
            age:data.age,
            'image-url':data['image-url'],
            status:data.status,
            story:data.story
        };
        this.props.edit(id,dogData);
    }

    componentDidMount(){
        const {id}= this.props.match.params;
        this.getDogById(id);
    }
    render(){
        const {selectedItem}=this.state;
        const {isAdmin, edit}=this.props;
        const breeds = staticData.breeds;
        const statuses= staticData.statuses;

        if(!isAdmin){
            return <Redirect to="/"/>
         }
        return(
            <main className='site-content admin'>
            <section className="site-edit">
                <BindingForm 
                    formType='Edit' 
                    onSubmit={this.handelSubmit} 
                    initialState={selectedItem}
                >
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
                        type="text" 
                        id="image-url" 
                        name="image-url"
                        pattern="(http)?s?:?(\/\/[^']*\.(?:png|jpg|jpeg|gif|png|svg))"
                        required
                    />
                    <select 
                        id="status" 
                        name="status"
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