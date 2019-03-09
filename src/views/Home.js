import React from 'react';
import {UserContext} from '../components/contexts/userContext';
import HomeScreen from '../components/HomeScreen';

const Home =(props)=>(
    <HomeScreen
        title={props.title}
        description={props.description}
        buttons={props.buttons}
    />
)

const HomeWithContext =(props)=>{
    return(
        <UserContext.Consumer>
        {
            ({username, isAdmin})=>(
                username ? (
                    isAdmin ? ( 
                      <Home 
                        {...props}
                        title={`Welcome, Admin!`}
                        description="Your currently available options are below. To get back to this page click on the logo."
                        buttons={['create', 'dashboard','catalog',]}
                      />
                    ) : ( 
                      <Home 
                       {...props}
                        title={`Welcome, ${username}!`}
                        description="Are you ready to choose your new furry friend? Check out our Catalog for more information. To get back to this page click on the logo."
                        buttons={['catalog', 'profile']}
                      />
                      )
                    ) : (
                    <Home 
                      {...props}
                      title="Adopt a dog!"
                      description="Our platform is dedicated to finding homes for lost, abandoned or street
                      dogs. If you recognize your lost furry friend or just want to make a new one, contact us or adopt
                      via the platform!"
                      buttons={['login', 'signup']}
                    />
                )
            )
        }
        </UserContext.Consumer>
    )
}

export {Home}
export default HomeWithContext;
