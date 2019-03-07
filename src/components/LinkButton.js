import React from 'react';
import {Link} from 'react-router-dom';

const LinkButton =(props)=>{
    const {buttonType, noButtonStyle, extraClassNames, idForPath,text, onClick}=props;
    let styleClasses=`button ${extraClassNames}`;
    if(noButtonStyle){
        styleClasses=`${extraClassNames}`;
    }
    

    // from Home Page: 'login', 'signup', create', 'dashboard','catalog', 'profile'
    switch(buttonType){
        case 'dashboard':
        case 'create':
        case 'catalog': 
        case 'login':
        case 'signup':
        case 'logout':
            return(<Link to={`/${buttonType}`} key={buttonType} className={styleClasses}>{text}</Link>);
        case 'details':
        case 'profile':
        case 'edit':
            return(<Link to={`/${buttonType}/${idForPath}`} key={buttonType} className={styleClasses}>{text}</Link>);
        case 'delete':
            return(<Link to={`/catalog`} key={buttonType} className={styleClasses +' cancel'} onClick={onClick}>{text}</Link>);
        case 'adopt':
            return(<Link to='/' key={buttonType} className={styleClasses} onClick={onClick}>{text}</Link>);
        case 'backToHome':
            return(<Link to='/' key={buttonType} className={styleClasses}>{text}</Link>);
        case 'backToCatalog':
            return(<Link to='/catalog' key={buttonType} className={styleClasses}>{text}</Link>);
        default:
            return null;
    }
}

export default LinkButton;