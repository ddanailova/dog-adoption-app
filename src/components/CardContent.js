import React from 'react';
import {Link} from 'react-router-dom';


const CardContent =(props)=>{
    const {details, buttons, note, isThumbnail}=props
    const {_id,name, breed,age, story} = details;


    if(isThumbnail){
        return (
            <div className="content">
            <h3>Hello, my name is {name}</h3>
            <Link to={`/details/${_id}`} className="button button-revelse">Details</Link>
        </div>
        )
    }
    return (
        <div className="content">
            <h2>More information about {name}</h2>
            <hr/>
            <p><span>Breed: </span>{breed}</p>
            <p><span>Age: </span>{age}</p>
            <p><span>Story: </span>{story}</p>
            {
                buttons.map(button=>{
                    let classCancelle =''
                    if(button==='delete'){
                        classCancelle='cancelle'
                    }
                    return(
                        <Link to={`/${button}`} key={button} className={`button button-revelse ${classCancelle}`}>{button}</Link>
                        )}
                    )
            }
            
            <p>* {note}</p>
            <Link to='/'> Back &gt;&gt;</Link>
        </div>
    )
}

export default CardContent;