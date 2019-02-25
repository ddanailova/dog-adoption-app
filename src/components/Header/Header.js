import React, {Fragment } from 'react';
import {Link} from 'react-router-dom';

const Header =(props)=>{
    const {username, isAdmin}=props;
    return(
    <header className="site-header">
        <div className="site-branding">
            <p className="logo"><Link to="/"><i className="fas fa-paw"></i>Dogs</Link></p>
            <p className="slogan">Adopt, make a difference!</p>
        </div>
        <nav className="site-header-nav">
        { username?
            <ul>
                {
                    isAdmin?
                       <Fragment>
                           <li key='home'><Link to="/">Home</Link></li>
                           <li key='newCart'><a href="new-card.html">New Cart</a></li>
                       </Fragment>
                       :null
                }
                <li key='catalog'><Link to="/catalog">Catalog</Link></li>
                <li key='logout'><a href="../guest/index.html">Logout</a></li>
            </ul>
            :null
        }
        </nav>
    </header>
)};

export default Header