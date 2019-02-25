import React, {Component} from 'react';

class Login extends Component{
    constructor(props){
        super(props);

        this.state={
            username:'',
            password:''
        }
    }

    handelSubmit = (ev)=>{
        ev.preventDefault();
        this.props.login(this.state);
    }

    handleInputChange =(ev)=>{
        const {name, value}=ev.target;
        this.setState({
            [name]:value
        });
    }

    render(){
        const {username, password}=this.state;
        return(
            <main className='site-content guest'>
                <section className="site-login">
                    <form onSubmit={this.handelSubmit}>
                        <h2>Login</h2>
                        <p className="field">
                            <label htmlFor="username">Username</label>
                            <span className="input">
                                <input 
                                    type="text" 
                                    id="username" 
                                    name="username"
                                    value={username}
                                    onChange={this.handleInputChange}
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
                                    value={password}
                                    onChange={this.handleInputChange}
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