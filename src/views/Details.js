import React, {Component} from 'react';
import dogService from '../services/dogService';
import CardWithContext from './../components/Card';


class Details extends Component{

    constructor(props){
        super(props)

        this.state={
            selectedItem:{},
            isLoading:false
        }

        this.getDogById=this.props.getDogById.bind(this);
    }
    static DogService = new dogService();

    componentDidMount(){
        this.setState({isLoading:true},()=>{
            const {id}= this.props.match.params;
            this.getDogById(id);
        })
    }


    render(){
        const {selectedItem, isLoading}=this.state;
        return (
            <main className='site-content user'>
                <section className="site-details">
                    {
                        isLoading ? (
                            <h3><i className="fas fa-paw"></i> Loading ........ <i className="fas fa-paw"></i></h3>
                        ):(
                        <CardWithContext {...this.props} details={selectedItem} />)
                    }
                </section>
            </main>
        )
    }
}

export default Details