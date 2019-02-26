import React, {Fragment } from 'react';
import {Link} from 'react-router-dom';

import Navigation from '../Navigation/Navigation'

const Header =(props)=>{
    const {username}=props;

    return(
    <header className="site-header">
        <div className="site-branding">
            <p className="logo"><Link to="/"><i className="fas fa-paw"></i>Dogs</Link></p>
            <p className="slogan">Adopt, make a difference!</p>
        </div>
        { 
            username?<Navigation {...props}/>:null
        }
    </header>
)};

export default Header