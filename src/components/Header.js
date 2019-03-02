import React  from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../components/contexts/userContext';

const Header =(props)=>{
    const {username, logout}=props;

    return(
    <header className="site-header">
        <div className="site-branding">
            <p className="logo"><Link to="/"><i className="fas fa-paw"></i>Dogs</Link></p>
            <p className="slogan">Adopt, make a difference!</p>
        </div>
        { 
            username?<Link to="/logout" className="button">Logout</Link>:null
        }
    </header>
)};


const HeaderWithContext =(props)=> {
    return (
        <UserContext.Consumer>
            {
                ({username, isAdmin, updateUser})=>(
                    <Header
                        {...props}
                        username={username}
                        updateUser={updateUser}
                        isAdmin={isAdmin}
                    />
                )
            }
        </UserContext.Consumer>
    )
}
export {Header}
export default HeaderWithContext;