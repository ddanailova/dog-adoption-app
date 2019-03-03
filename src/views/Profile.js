import React, {Component, Fragment} from 'react';
import toast from 'react-toastify';
import {Card} from '../components/Card';
import userService from './../services/userService';
import {DogContext} from '../components/contexts/dogContext';

class Profile extends Component{
    constructor(props){
        super(props);

        this.state={
            userDetails:{},
            isLoaing:true
        }
    }
    
    static UserService = new userService();
    
    componentDidMount(){
        const id= localStorage.getItem('userId');
        Profile.UserService.getUserById(id)
        .then(resBody=>{
            if(resBody.error){
                toast.error(resBody.description, {
                    closeButton: false,
                    autoClose: false
                })
            }else{
                this.setState({
                    userDetails:resBody,
                    isLoaing:false
                })
            }
        })
        .catch(err=>{
            console.log(err);
            this.setState({
                isLoading:false
            });
            toast.error('Sorry, something went wrong with the server. We are working on it!', {
                closeButton: false,
                autoClose: false
            })
        })
    }

    render(){
        const {userDetails, isLoading}=this.state;
        const {checkedDogs}=this.props;
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
                        (checkedDogs.length === 0) ? (
                            <h5> You have nothing in your watch list yet.</h5>
                        ) : (
                                checkedDogs.map(dog=><Card {...this.props} details={dog} isThumbnail={true} key={dog._id} />)
                        )
                    }
                    </section>
                    </Fragment>
                )
            }
            </section>
        </main>
    )}
}

const ProfileWithDogContext =(props)=>{
    return(
        <DogContext.Consumer>
            {
                ({checkedDogs})=>{
                    return(
                        <Profile {...props} checkedDogs={checkedDogs}/>
                    )
                }
            }
        </DogContext.Consumer>
    )
}

export {Profile}
export default ProfileWithDogContext;