import React, {Component, Fragment} from 'react';
import toast from 'react-toastify';
import {Card} from '../components/Card';
import userService from './../services/userService';


class Profile extends Component{
    constructor(props){
        super(props);

        this.state={
            userDetails:{},
            isLoaing:true
        }

        this.getUserById=this.props.getUserById.bind(this)
    }
    
    static UserService = new userService();
    
    componentDidMount(){
        const {id}= this.props.match.params;
        this.getUserById(id);
    }

    render(){
        const {userDetails, isLoading}=this.state;
        // const {checkedDogs}=this.props;
        const note = 'At the moment the option of editing your profile details is unavailable trought the platform. If there is an error get in touch and we will assist you changing the details.';
        return(
        <main className='site-content user'>
            <section className="site-details">
            {
                isLoading ? (
                    <h3><i className="fas fa-paw"></i> Loading ........ <i className="fas fa-paw"></i></h3>
                ):(
                    <Fragment>
                    <Card details={userDetails} note={note} isProfile={true}/>
                    <section className='watch-list'>
                    <h2>Watch List</h2>
                    <hr/>
                    {

                    }
                    </section>
                    </Fragment>
                )
            }
            </section>
        </main>
    )}
}


export default Profile