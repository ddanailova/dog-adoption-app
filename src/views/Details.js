import React, {Component} from 'react';
import {UserContext} from '../components/contexts/userContext';
import toast from 'react-toastify';
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

    componentDidMount(){
        const {id}= this.props.match.params;
        Details.DogService.getById(id)
        .then(resBody=>{
            if(resBody.error){
                toast.error(resBody.description, {
                    closeButton: false,
                    autoClose: false
                })
            }else{
                this.setState({
                    selectedItem:resBody,
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
        const {selectedItem,isLoading}=this.state;
        return (
            <main className='site-content user'>
                <section className="site-details">
                {isLoading ? (
                        <h3><i className="fas fa-paw"></i> Loading ........ <i className="fas fa-paw"></i></h3>
                    ) :( <CardWithContext {...this.props} details={selectedItem} />)
                }
                </section>
            </main>
        )
    }
}

// const DetailsWithContext =(props)=>{
//     return(
//         <UserContext.Consumer>
//             {
//                 ({isAdmin})=>{
//                     let buttons = ['adopt'];
//                     let note='If you press the Adopt button we will get in touch with you for more details before proceeding with your request.';

//                     if(isAdmin){
//                         buttons=['edit','delete'];
//                         note='Pressing Delete button is irreversible. Please proceed with caution!'
//                     }
//                     return(
//                         <Details {...props} buttons={buttons} note={note}/>
//                     )
//                 }
//             }
//         </UserContext.Consumer>
//     )
// }


export default Details;