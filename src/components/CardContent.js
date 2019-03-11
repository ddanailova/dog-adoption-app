import React from 'react';
import LinkButton from './LinkButton';

const CardContent =(props)=>{
    const {details, buttons, note, isThumbnail, isProfile, removeDog, createApplication, addDogToUserWatched}=props;

    const handleClickButton =(ev)=>{
        const buttonType =ev.target.text.toLowerCase();

        if(buttonType==='delete'){
            removeDog(details._id);
        }else if(buttonType ==='adopt'){
            if(details.status === 'available'){
                createApplication({
                    dogId:details._id,
                    userId:localStorage.getItem('userId'),
                    status:'processing'
                }, details);
            }
        }else if(buttonType ==='watch'){
            const userId= localStorage.getItem('userId');
            addDogToUserWatched(userId,details);
        }
    }
    
    if(isThumbnail){
        return (
            <div className="content">
            <h3>Hello, my name is {details.name}</h3>
            <LinkButton 
                buttonType='details'
                idForPath={details._id} 
                extraClassNames='button-reverse'
                text='details'
            />
        </div>
        )
    }

    if(isProfile){
        return(
            <div className="content">
                <h2>Profile Details</h2>
                <hr/>
                <p><span>Username: </span>{details.username}</p>
                <p><span>Full Name: </span>{details['full-name']}</p>
                <p><span>E-mail: </span>{details.email}</p>
                <p><span>Phone: </span>{details.phone}</p>
                <p>* {note}</p>
                <LinkButton 
                    buttonType='backToHome'
                    noButtonStyle={true} 
                    text='Back to Home >>'
                />
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
                    return(
                        <LinkButton 
                            key={button}
                            text={button}
                            buttonType={button}
                            idForPath={details._id}
                            extraClassNames='button-reverse'
                            onClick={handleClickButton}
                        />
                    )
                })
            }
            
            <p>* {note}</p>
            <LinkButton 
                buttonType='backToCatalog'
                noButtonStyle={true} 
                text='Back to Catalog >>'
            />
        </div>
    )
}

export default CardContent;