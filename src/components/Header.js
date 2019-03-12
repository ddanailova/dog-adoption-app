import React  from 'react';
import {Link} from 'react-router-dom';
import LinkButton from './LinkButton';
import {UserContext} from './contexts/userContext';

const Header =(props)=>{
    const {username}=props;

    return(
    <header className="site-header">
        <div className="site-branding">
            <p className="logo"><Link to="/"><i className="fas fa-paw"></i>Dogs</Link></p>
            <p className="slogan">Adopt, make a difference!</p>
        </div>
        { 
            username?<LinkButton buttonType={'logout'} text={'logout'}>Logout</LinkButton>:null
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