import React, {Component} from 'react';

class Login extends Component{
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
                <section className="site-login">
                    <form>
                        <h2>Login</h2>
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
                        <input type="submit" className="button" value="Login"/>
                    </form>
                </section>
            </main>
        )
    }
}

export default Login;