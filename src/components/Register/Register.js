import React, {Component} from 'react';
import { toast } from 'react-toastify';


class Register extends Component{
    constructor(props){
        super(props);

        this.state={
            username:'',
            password:'',
            repeatPassword:'',
            fullName:'',
            email:'',
            phone:''
        }
    }

    handelSubmit = (ev)=>{
        ev.preventDefault();
        let userData = {...this.state};
        delete userData.repeatPassword;
        this.props.register(userData);
    }

    handleInputChange =(ev)=>{
        const {name, value}=ev.target;
        this.setState({
            [name]:value
        });
    }

    checkInputValidation=(ev)=>{
        const {target}=ev;
        if(!target.checkValidity()){
          toast.error(target.validationMessage, {
            closeButton: false
          });
        }
        // if(this.state.password !== this.state.repeatPassword){
        //     toast.error('The passwords must match', {
        //         closeButton: false
        //       });
        // }
    }


    render(){
        const {
            username,
            password,
            repeatPassword,
            fullName,
            email,
            phone
        }=this.state;

        return(
            <main className='site-content guest'>
                <section className="site-signup">
                    <form onSubmit={this.handelSubmit}>
                        <h2>Register</h2>
                        <p className="field">
                            <label htmlFor="username">Username</label>
                            <span className="input">
                                <input 
                                    type="text" 
                                    id="username" 
                                    name="username"
                                    value={username}
                                    onChange={this.handleInputChange}
                                    onBlur={this.checkInputValidation}
                                    minLength="3"
                                    maxLength="15"
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
                                    onBlur={this.checkInputValidation}
                                    minLength="5"
                                    maxLength="15"
                                />
                                <span className="actions"></span>
                                <i className="fas fa-key"></i>
                            </span>
                            {/* <span class="form-error">The field is required</span> */}
                        </p>
                        <p className="field">
                            <label htmlFor="confirm-password">Repeat Password</label>
                            <span className="input">
                                <input 
                                    type="password" 
                                    id="repeat-password" 
                                    name="repeatPassword"
                                    value={repeatPassword}
                                    onChange={this.handleInputChange}
                                    onBlur={this.checkInputValidation}
                                    pattern={this.state.password}
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
                                    name="fullName"
                                    value={fullName}
                                    onChange={this.handleInputChange}
                                    onBlur={this.checkInputValidation}
                                    minLength="3"
                                    maxLength="25"
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
                                    value={email}
                                    onChange={this.handleInputChange}
                                    onBlur={this.checkInputValidation}
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
                                    type="tel" 
                                    id="phone" 
                                    name="phone"
                                    value={phone}
                                    onChange={this.handleInputChange}
                                    onBlur={this.checkInputValidation}
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