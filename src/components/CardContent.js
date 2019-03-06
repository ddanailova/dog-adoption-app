import React from 'react';
import {Link} from 'react-router-dom';

const CardContent =(props)=>{
    const {details, buttons, note, isThumbnail, isProfile, remove}=props;

    const handleClickButton =(ev)=>{
        const buttonType =ev.target.text.toLowerCase();

        switch(buttonType){
            case 'delete': 
                remove(details._id);
                break;
            default:
                break;
        }
    }
    
    if(isThumbnail){

        return (
            <div className="content">
            <h3>Hello, my name is {details.name}</h3>
            <Link to={`/details/${details._id}` } className="button button-revelse">Details</Link>
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
                <Link to="/"> Back to Home&gt;&gt;</Link>
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
                    let classCancelle ='';
                    let path=`/${button}/${details._id}`
                    if(button==='delete'){
                        classCancelle='cancelle';
                        path='/'
                    }
                    return(
                        <Link to={path} key={button} className={`button button-revelse ${classCancelle}`} onClick={handleClickButton}>{button}</Link>
                        )}
                    )
            }
            
            <p>* {note}</p>
            <Link to='/catalog'> Back to Catalog &gt;&gt;</Link>
        </div>
    )
}

export default CardContent;