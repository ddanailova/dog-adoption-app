import React, {Component} from 'react';

class BindingForm extends Component {
    constructor(props){
        super(props);

        this.state={
            errors:{}
        }
    }

    iconsList = {
        username:'fas fa-user',
        password:'fas fa-key',
        'repeat-password':'fas fa-key',
        'full-name':'fas fa-user',
        email:'fas fa-envelope',
        phone:'fas fa-phone'
    }

    errorMassages = {
        username:'User name must be 3 to 15 symbols',
        password:'Password must be 5 to 10 symbols',
        'repeat-password':'Passwords should match',
        'full-name':'Full name must be 5 to 25 symbols',
        email:'Please provide a valid email',
        phone:'Please provide a valid phone number'
    }

    componentDidMount(){
        this.props.children.forEach(child=>{
            if(child.type==='input'){
                this.setState({
                    [child.props.name]:null,
                })
            }
        });
    }

    handleChange=(ev)=>{
        const {name, value}= ev.target;
        this.setState({
            [name]:value
        })
        this.checkInputValidit(ev)
    }

    checkInputValidit=(ev)=>{
        const {target}=ev;
        const {name}=target
        if(!target.validity.valid){
            this.setState({
                errors:{[name]:this.errorMassages[name]}
            })
        }else{
            this.setState({
                errors:{[name]:null}
            })
        }
    }

    render(){
        return(
            <form onSubmit={(ev)=>this.props.onSubmit(ev, this.state)}>
            <h2>{this.props.formType}</h2>
                {
                    React.Children.map(this.props.children,(child)=>{
                        if(child.type === 'input'){
                            const inputName =child.props.name;
                            const icon = this.iconsList[inputName];
                            let newChild = React.cloneElement(child,{onChange:this.handleChange, ...child.props} )
                            return (
                                <p className="field">
                                <label htmlFor={inputName}>{inputName.replace('-', ' ')}</label>
                                {
                                    this.state.errors[inputName] ?
                                    <span className="form-error">{this.state.errors[inputName]}</span>
                                    :null
                                }
                                <span className="input">
                                    {newChild}
                                    <span className="actions"></span>
                                    <i className={icon}></i>
                                </span>
                            </p>
                            )
                        }
                        return child;
                    })
                }
                <button className="button">{this.props.formType}</button>
            </form>
        )
    }
}

export default BindingForm;