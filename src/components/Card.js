import React from 'react';
import {UserContext} from '../components/contexts/userContext';
import CardContent from './CardContent';

const Card =(props)=>{
    const {details, isProfile}=props;
    
    return (
        <div className="card">
            {
                !isProfile? (
                    <div className="media">
                        <img src={details['image-url']} alt="Dog"/>
                    </div>
                ):null
            }
            <CardContent {...props}/>
        </div>
    )
}

const CardWithContext =(props)=>{
    return(
        <UserContext.Consumer>
            {
                ({isAdmin})=>{
                    let buttons = ['adopt', 'watch'];
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