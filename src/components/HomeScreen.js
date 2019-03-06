import React from 'react';
import {Link} from 'react-router-dom'

const HomeScreen=(props)=>{
    return(
        <main className='site-content guest'>
        <section className="site-index">
            <h1>{props.title}</h1>
            <p className="site-description">
                {props.description}
            </p>
                {
                    props.buttons.map(button=>{
                        const userId = localStorage.getItem('userId');
                        if(button==='profile'){
                            return<Link to={`/${button}/${userId}`} key={button} className="button">{button}</Link>
                        }
                        return<Link to={`/${button}`} key={button} className="button">{button}</Link>
                    })
                }
        </section>
    </main>
    )
}

export default HomeScreen