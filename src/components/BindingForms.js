import React, {Component} from 'react';
import isEqual from 'react-fast-compare';
import staticData from '../constants/staticData.js';
import Button from './LinkButton';

class BindingForm extends Component {
    constructor(props){
        super(props);

        this.state={
            initialState:{},
            errors:{}
        }
    }

    static iconsList = staticData.iconsList;
    static errorMassages =staticData.errorMassages;


    static getDerivedStateFromProps(props, state){

        if(!props.initialState){
            return state;
        }else if(Object.keys(props.initialState).length !==0 && !isEqual(props.initialState,state.initialState)){
            return {
                ...props.initialState,
                errors:{},
                initialState:props.initialState
            }
        }
        return state;
    }
    componentDidMount(){
        const {initialState} = this.props;
        if(initialState){

        }
        this.props.children.forEach(child=>{
            if(child.type==='input' || child.type==='select'|| child.type==='textarea'){
                this.setState({
                    [child.props.name]:'',
                    initialState:{}
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
                            let newChild;

                            if(this.props.formType==='edit'){
                                newChild = React.cloneElement(child,{value:this.state[inputName],onChange:this.handleChange, ...child.props} );
                            }else{
                                newChild = React.cloneElement(child,{onChange:this.handleChange, ...child.props} );
                            }
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
                    <button className="button button-reverse">{this.props.formType}</button>

                ):(
                    <button className="button">{this.props.formType}</button>
                )}
            </form>
        )
    }
}

export default BindingForm;