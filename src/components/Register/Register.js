import React, {Component} from 'react';


class Register extends Component{
    constructor(props){
        super(props);

        this.state={
            username:'',
            password:''
        }
    }

    render(){
        return(
            <main className='site-content guest'>
                <section className="site-signup">
                    <form>
                        <h2>Register</h2>
                        <p className="field">
                            <label htmlFor="username">Username</label>
                            <span className="input">
                                <input 
                                    type="text" 
                                    id="username" 
                                    name="username"
                                />
                                <span className="actions"></span>
                                <i className="fas fa-user"></i>
                            </span>
                            {/* <span class="form-error">The field is required</span> */}
                        </p>
                        <p className="field">
                            <label htmlFor="password">Password</label>
                            <span className="input">
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password"
                                />
                                <span className="actions"></span>
                                <i className="fas fa-key"></i>
                            </span>
                            {/* <span class="form-error">The field is required</span> */}
                        </p>
                        <p className="field">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <span className="input">
                                <input 
                                    type="password" 
                                    id="confirm-password" 
                                    name="confirm-password"
                                />
                                <span className="actions"></span>
                                <i className="fas fa-key"></i>
                            </span>
                            {/* <span class="form-error">The field is required</span> */}
                        </p>
                        <p className="field">
                            <label htmlFor="full-name">Full Name</label>
                            <span className="input">
                                <input 
                                    type="text" 
                                    id="full-name" 
                                    name="full-name"
                                />
                                <span className="actions"></span>
                                <i className="fas fa-user"></i>
                            </span>
                            {/* <span class="form-error">The field is required</span> */}
                        </p>
                        <p className="field">
                            <label htmlFor="email">E-mail</label>
                            <span className="input">
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                />
                                <span className="actions"></span>
                                <i className="fas fa-envelope"></i>
                            </span>
                            {/* <span class="form-error">The field is required</span> */}
                        </p>
                        <p className="field">
                            <label htmlFor="phone">Phone</label>
                            <span className="input">
                                <input 
                                    type="text" 
                                    id="phone" 
                                    name="phone"
                                />
                                <span className="actions"></span>
                                <i className="fas fa-phone"></i>
                            </span>
                            {/* <span class="form-error">The field is required</span> */}
                        </p>
                        <input type="submit" className="button" value="Signup"/>
                    </form>
                </section>
            </main>
        )
    }
}

export default Register;