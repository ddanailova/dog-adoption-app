import React, {Component} from 'react';
import HomeScreen from '../components/HomeScreen';

class Logout extends Component{

    componentDidMount(props){
        const {logout}=this.props;
        logout();
    }
    render(){

        return (
            <HomeScreen
                title='Goodbye, see you soon!'
            />
        )
    }
}

export default Logout;