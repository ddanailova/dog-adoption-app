import React from 'react';
import LinkButton from './LinkButton';

const HomeScreen=(props)=>{
    const {title, description,buttons}=props;
    return(
        <main className='site-content guest'>
        <section className="site-index">
        {
        // //For testing the error handling
        // this.props.something
        }
            <h1>{title}</h1>
            <p className="site-description">
                {description}
            </p>
                {
                    buttons?
                        props.buttons.map(button=>{
                            const userId = localStorage.getItem('userId');
                                return <LinkButton idForPath={userId} buttonType={button} text={button} key={button}/>
                    }):null
                }
        </section>
    </main>
    )
}

export default HomeScreen