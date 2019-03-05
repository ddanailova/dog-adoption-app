import React, {Component} from 'react';
import staticData from '../constants/staticData.js'

class BindingForm extends Component {
    constructor(props){
        super(props);

        this.state={
            errors:{}
        }
    }

    static iconsList = staticData.iconsList;
    static errorMassages =staticData.errorMassages;

    componentDidMount(){
        this.props.children.forEach(child=>{
            if(child.type==='input' || child.type==='select'|| child.type==='textarea'){
                this.setState({
                    [child.props.name]:null,
                })
            }
        });
    }

    handleChange=(ev)=>{
        const {name, value}= ev.target;
        this.setState({
            [name]:value,
        })
        this.checkInputValidit(ev)
    }

    checkInputValidit=(ev)=>{
        const {target}=ev;
        const {name}=target
        if(!target.validity.valid){
            this.setState({
                errors:{[name]:BindingForm.errorMassages[name]}
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
                        if(child.type === 'input' || child.type==='select'|| child.type==='textarea'){
                            const inputName =child.props.name;
                            const icon = BindingForm.iconsList[inputName];
                            let newChild = React.cloneElement(child,{onChange:this.handleChange, ...child.props} )
                            return (
                                <p className="field">
                                <label htmlFor={inputName}>{inputName.replace('-', ' ')}</label>
                                {
                                    this.state.errors[inputName] ?
                                    <span className="form-error">{this.state.errors[inputName]}</span>
                                    :null
                                }
                                {
                                    (child.type === 'input') ? (
                                        <span className="input">
                                            {newChild}
                                            <span className="actions"></span>
                                            <i className={icon}></i>
                                        </span>
                                        ) : (
                                            newChild
                                    )
                                }
                            </p>
                            )
                        }
                        return child;
                    })
                }
                { localStorage.getItem('username')?(
                    <button className="button button-revelse">{this.props.formType}</button>

                ):(
                    <button className="button">{this.props.formType}</button>
                )}
            </form>
        )
    }
}

export default BindingForm;