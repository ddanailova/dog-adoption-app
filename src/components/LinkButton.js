import React from 'react';
import {Link} from 'react-router-dom';

const LinkButton =(props)=>{
    const {
        buttonType, 
        noButtonStyle, 
        extraClassNames, 
        idForPath, 
        text, 
        onClick, 
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
            case 'cancel':
            case 'remove':
                onClick()
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
        case 'cancel':
        case 'remove':
            return(<Link to={`/dashboard`} className={styleClasses } onClick={onClick}>{text}</Link>);
        default:
            return null;
    }
}

export default LinkButton;