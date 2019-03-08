import React from 'react';
import LinkButton from './LinkButton';

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
                            return <LinkButton idForPath={userId} buttonType={button} text={button} key={button}/>
                    })
                }
        </section>
    </main>
    )
}

export default HomeScreen