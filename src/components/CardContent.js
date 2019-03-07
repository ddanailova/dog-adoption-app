import React from 'react';
import {Link} from 'react-router-dom';
import LinkButton from './LinkButton';

const CardContent =(props)=>{
    const {details, buttons, note, isThumbnail, isProfile, removeDog, createApplication}=props;

    const handleClickButton =(ev)=>{
        const buttonType =ev.target.text.toLowerCase();

        switch(buttonType){
            case 'delete': 
                removeDog(details._id);
                break;
            case 'adopt':
                if(details.status === 'available'){
                    createApplication({
                        dogId:details._id,
                        userId:localStorage.getItem('userId'),
                        status:'processing'
                    }, details);
                }
                break;
            default:
                break;
        }
    }
    
    if(isThumbnail){

        return (
            <div className="content">
            <h3>Hello, my name is {details.name}</h3>
            <LinkButton buttonType={'details'} idForPath={details._id} extraClassNames={'button-reverse'} text={'details'}/>
        </div>
        )
    }

    if(isProfile){
        return(
            <div className="content">
                <h2>Profile Deteails</h2>
                <hr/>
                <p><span>Username: </span>{details.username}</p>
                <p><span>Full Name: </span>{details['full-name']}</p>
                <p><span>E-mail: </span>{details.email}</p>
                <p><span>Phone: </span>{details.phone}</p>
                <p>* {note}</p>
                <LinkButton buttonType={'backToHome'} noButtonStyle={true} text={'Back to Home >>'}/>
            </div>
        )
    }

    return (
        <div className="content">
            <h2>More information about {details.name}</h2>
            <hr/>
            <p><span>Breed: </span>{details.breed}</p>
            <p><span>Age: </span>{details.age}</p>
            <p><span>Status: </span>{details.status}</p>
            <p><span>Story: </span>{details.story}</p>
            {
                buttons.map(button=>{
                    // let classCancelle ='';
                    // let path=`/${button}/${details._id}`
                    // if(button==='delete'){
                    //     classCancelle='cancelle';
                    //     path='/catalog';
                    // }
                    // if(button==='adopt'){
                    //     path='/';
                    // }
                    // <Link to={path} key={button} className={`button button-reverse ${classCancelle}`} onClick={handleClickButton}>{button}</Link>
                    return(
                        <LinkButton buttonType={button} idForPath={details._id} extraClassNames={`button-reverse`} text={button}  onClick={handleClickButton}/>
                        )}
                    )
            }
            
            <p>* {note}</p>
            <LinkButton buttonType={'backToCatalog'} noButtonStyle={true} text={'Back to Catalog >>'}/>
        </div>
    )
}

export default CardContent;