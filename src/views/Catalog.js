import React, {Component} from 'react';
import dogService from '../services/dogService';
import {Card} from '../components/Card'


class Catalog extends Component{
    constructor(props){
        super(props)

        this.state ={
            dogs:[],
            isLoading:true
        }

        this.getAllDogs=this.props.getAllDogs.bind(this);
    }

    static DogService = new dogService();

    componentDidMount(){
        this.getAllDogs()
    }

    render(){
        const {dogs, isLoading}=this.state;

        return(
            <main className='site-content user'>
                <section className="site-index">
                <h1>Dogs available for adoption</h1>
                {
                    isLoading ? (
                        <h3><i className="fas fa-paw"></i> Loading ........ <i className="fas fa-paw"></i></h3>
                    ):(dogs.length===0 ? (
                        <h3><i className="fas fa-paw"></i> Sorry, there are no dogs available for adoption at the moment <i className="fas fa-paw"></i></h3>
                    ) : (
                        dogs.map(dog=><Card {...this.props} details={dog} isThumbnail={true} key={dog._id}/>)
                    ))
                }
                </section>
            </main>
        );
    }
}

export default Catalog;

