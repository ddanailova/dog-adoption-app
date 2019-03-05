import React, {Component} from 'react';
import dogService from '../services/dogService';
import CardWithContext from './../components/Card';


class Details extends Component{

    constructor(props){
        super(props)

        this.state={
            selectedItem:{},
        }

        this.getDogById=this.props.getDogById.bind(this);
    }
    static DogService = new dogService();

    componentDidMount(){
        const {id}= this.props.match.params;
        this.getDogById(id);
    }


    render(){
        const {selectedItem}=this.state;
        return (
            <main className='site-content user'>
                <section className="site-details">
                    {
                        <CardWithContext {...this.props} details={selectedItem} />
                    }
                </section>
            </main>
        )
    }
}

export default Details