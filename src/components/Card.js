import React from 'react';
import {UserContext} from '../components/contexts/userContext';
import CardContent from './CardContent';

const Card =(props)=>{
    const {imageUrl} =props.details;
    return (
        <div className="card">
            <div className="media">
                <img src={imageUrl} alt="Dog"/>
            </div>
            <CardContent {...props}/>
        </div>
    )
}

const CardWithContext =(props)=>{
    return(
        <UserContext.Consumer>
            {
                ({isAdmin})=>{
                    let buttons = ['adopt'];
                    let note='If you press the Adopt button we will get in touch with you for more details before proceeding with your request.';

                    if(isAdmin){
                        buttons=['edit','delete'];
                        note='Pressing Delete button is irreversible. Please proceed with caution!'
                    }
                    return(
                        <Card {...props} buttons={buttons} note={note}/>
                    )
                }
            }
        </UserContext.Consumer>
    )
}

export {Card};
export default CardWithContext;