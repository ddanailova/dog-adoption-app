import React from 'react';
import {Link} from 'react-router-dom';

const LinkButton =(props)=>{
    const {
        buttonType, 
        noButtonStyle, 
        extraClassNames, 
        idForPath, 
        text, 
        changeApplication,
        removeApplication,
        details, 
        removeDog, 
        createApplication, 
        addDogToUserWatched
    }=props;
    
    let styleClasses=`button ${extraClassNames}`;
    if(noButtonStyle){
        styleClasses=`${extraClassNames}`;
    }

    const handleClickButton =(ev)=>{
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
            case 'watch':
                const userId= localStorage.getItem('userId');
                addDogToUserWatched(userId,details);
                break;
            case 'approve':
                if(details.status !== 'approved'){
                    const newAppData = {...details, status:'approved'}
                    changeApplication(details._id, newAppData, details.dogId, 'adopted');
                }
                break;
            case 'cancel': 
                if(details.status !== 'canceled'){
                    const newAppData = {...details, status:'canceled'}
                    changeApplication(details._id, newAppData, details.dogId, 'available');
                }
                break;
            case 'remove':
                removeApplication(details._id);
                break;
            default:
                break;
        }
    }

    switch(buttonType){
        case 'dashboard':
        case 'create':
        case 'catalog': 
        case 'login':
        case 'signup':
        case 'logout':
            return(<Link to={`/${buttonType}`} className={styleClasses}>{text}</Link>);
        case 'details':
        case 'profile':
        case 'edit':
            return(<Link to={`/${buttonType}/${idForPath}`} className={styleClasses}>{text}</Link>);
        case 'delete':
            return(<Link to={'/'} className={styleClasses +' cancel'} onClick={handleClickButton}>{text}</Link>);
        case 'adopt':
        case 'watch':
            return(<Link to='/' className={styleClasses} onClick={handleClickButton}>{text}</Link>);
        case 'backToHome':
            return(<Link to='/' className={styleClasses}>{text}</Link>);
        case 'backToCatalog':
            return(<Link to='/catalog' className={styleClasses}>{text}</Link>);
        case 'approve':
            if(details.status === 'approved'){
                styleClasses+= ' disabled';
            }
            return(<Link to={`/dashboard`} className={styleClasses} onClick={handleClickButton}>{text}</Link>);
        case 'cancel':
            if(details.status === 'canceled'){
                styleClasses+= ' disabled';
            }
            return(<Link to={`/dashboard`} className={styleClasses} onClick={handleClickButton}>{text}</Link>);
        case 'remove':
            return(<Link to={`/dashboard`} className={styleClasses} onClick={handleClickButton}>{text}</Link>);
        default:
            return null;
    }
}

export default LinkButton;