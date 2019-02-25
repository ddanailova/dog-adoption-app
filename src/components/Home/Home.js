import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Home extends Component{
    render(){
        return(
            <main className='site-content guest'>
                <section className="site-index">
                    <h1>Adopt a dog!</h1>
                    <p className="site-description">Our platform is dedicated to finding homes for lost, abandoned or street
                        dogs. If you recognize your lost furry friend or just want to make a new one, contact us or adopt
                        via
                        the platform!</p>
                    <Link to="/login" className="button">Login</Link>
                    <Link to="/register" className="button">Signup</Link>
                </section>
            </main>
        );
    }
}

export default Home;
