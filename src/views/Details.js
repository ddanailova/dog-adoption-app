import React, {Component} from 'react';
import toast from 'react-toastify';
import {DogContext} from '../components/contexts/dogContext'
import dogService from '../services/dogService';
import CardWithContext from './../components/Card';


class Details extends Component{

    constructor(props){
        super(props)

        this.state={
            selectedItem:{},
            isLoaing:true
        }
    }
    static DogService = new dogService();

    checkIfDogIsChecked=()=>{
        const {id}= this.props.match.params;
        const {checkedDogs}=this.props;

        if (checkedDogs.length !== 0) {
           return checkedDogs.find(dog => dog._id === id);
        }
        return false;
    }

    componentDidMount(){
        const {id}= this.props.match.params;
        const {updateCheckedDogs, getById}=this.props;
        const dog=this.checkIfDogIsChecked();

        Details.DogService.getById(id)
            .then(resBody => {
                if (resBody.error) {
                    toast.error(resBody.description, {
                        closeButton: false,
                        autoClose: false
                    })
                } else {
                    if(!dog){
                        updateCheckedDogs(resBody);
                    }

                    this.setState({
                        selectedItem: resBody,
                        isLoaing: false
                    })
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isLoading: false
                });
                toast.error('Sorry, something went wrong with the server. We are working on it!', {
                    closeButton: false,
                    autoClose: false
                }
            )
        })
    }


    render(){
        const {selectedItem,isLoaing}=this.state;
        return (
            <main className='site-content user'>
                <section className="site-details">
                    {
                        isLoaing ? (
                            <h3><i className="fas fa-paw"></i> Loading ........ <i className="fas fa-paw"></i></h3>
                        ) : (
                            
                            <CardWithContext {...this.props} details={selectedItem} />
                        )
                    }
                </section>
            </main>
        )
    }
}

const DetailsWithContext =(props)=>{
    return(
        <DogContext.Consumer>
            {
                ({checkedDogs, updateCheckedDogs})=>{
                    return(
                        <Details {...props} checkedDogs={checkedDogs} updateCheckedDogs={updateCheckedDogs}/>
                    )
                }
            }
        </DogContext.Consumer>
    )
}

export {Details}
export default DetailsWithContext;