import React from 'react';
import {Link} from 'react-router-dom'

const Profile =(props)=>{
    return(
        <main className='site-content user'>
        <section className="site-details">
            <div className="card">
                <div className="content">
                    <h2>Profile Deteails</h2>
                    <hr/>
                    <p><span>Username: </span>bruno</p>
                    <p><span>Full Name: </span>Bruno Pinto</p>
                    <p><span>E-mail: </span>bruno@gmail.com</p>
                    <p><span>Phone: </span> 0886177420 </p>
                    <p>* At the moment the option of editing your profile details is unavailable trought the platform. If there is an error get in touch and we will assist you changing the details.</p>
                    <Link to="/"> Back &gt;&gt;</Link>
                </div>
            </div>
        </section>
    </main>
    )
}

export default Profile;