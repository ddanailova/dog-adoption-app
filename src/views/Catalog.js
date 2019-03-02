import React, {Component} from 'react';
import { toast } from 'react-toastify';

import dogService from '../services/dogService';

import {Card} from '../components/Card'


class Catalog extends Component{
    constructor(props){
        super(props)

        this.state ={
            dogs:[],
            isLoading:true
        }
    }

    static DogService = new dogService();

    componentDidMount(){
        Catalog.DogService.getAll()
        .then(resBody=>{
            if(resBody.error){
                toast.error(resBody.description, {
                    closeButton: false,
                    autoClose: false
                })
            }else{
                this.setState({
                    dogs:resBody,
                    isLoading:false
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
        const {dogs, isLoading}=this.state;
      
        return(
            <main className='site-content user'>
                <section className="site-index">
                <h1>Dogs available for adoption</h1>
                <hr/>
                {
                    isLoading ? (
                        <h3><i className="fas fa-paw"></i> Loading ........ <i className="fas fa-paw"></i></h3>
                    ):(dogs.length===0 ? (
                        <h3><i className="fas fa-paw"></i> Sorry, there are no dogs available for adoption at the moment <i className="fas fa-paw"></i></h3>
                    ) : (
                        dogs.map(dog=><Card {...this.props} details={dog} isThumbnail={true} key={dogs._id} />)
                    ))
                }
                </section>
            </main>
        );
    }
}

export default Catalog;

