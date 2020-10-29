import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {actions, Control, Form} from 'react-redux-form';
import { Redirect } from 'react-router-dom';
import { login, login_with_token } from '../redux/ActionCreators';

const TextInput = Control.text;
const ButtonInput = Control.button;
const baseUrl='http://localhost:5000/api';;

function SignIn(props) {
    const [ formState , updateFormState ] = useState( 'SIGNIN' );
    const dispatch = useDispatch();
    const loggedIn = useSelector(state=>state.user.loggedIn);

    const handleSignIn = ( values ) => {
        dispatch(login(values));
    }

    const handleRegistration = ( values ) => {
        fetch(baseUrl+'/users/register',
        {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(values),
        credentials:'include'
        })
        .then(response=>{
            if(response.ok) {
                alert('registration successful');
                dispatch(actions.reset('register'));
            }
            else throw new Error(response.status+' '+response.statusText);
        },err=>{throw err;})
        .catch(err=>alert(err));
    }

    const handleForgotPass = ( values ) => {
        fetch(baseUrl+'/users/token',
        {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(values),
        credentials:'include'
        })
        .then(response=>{
            if(response.ok) {
                alert('Email Sent');
                dispatch(actions.reset('forgot_password'));
            }
            else throw new Error(response.status+' '+response.statusText);
        },err=>{throw err;})
        .catch(err=>alert(err));
    }

    const handleToken = values =>{
        dispatch(login_with_token(values));
    };

    return(<>
        {loggedIn&&<Redirect to='/home' />}
        <div className="card black signin-container">
            <img src="/assets/images/logo.png" class="signin-logo" alt="logo" />
            <div className="signin-form-container">
                <div className="form-container white-text">
                {
                    {
                        'SIGNIN': (
                        <>
                            <h4 className="white-text">Log In</h4>
                            <Form model="signIn" onSubmit={handleSignIn} >
                                <p className="signin-header-text" >Enter email id and password.</p>
                                <div className="row">
                                    <div className="col">
                                        <TextInput
                                            aria-label="Email"
                                            className="grey darken-4 white-text signin-text-field"
                                            model=".username"
                                            type="email"
                                            id="signIn-email-field"
                                            placeholder="Email"
                                            required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <TextInput
                                            aria-label="Password"
                                            className="grey darken-4 white-text signin-text-field"
                                            model=".password"
                                            type="password"
                                            id="signIn-password-field"
                                            placeholder="Password"
                                            required />
                                    </div>
                                </div>
                                <ButtonInput 
                                    type="submit"
                                    model="signIn"
                                    className="btn-flat waves-effect waves-light signin-form-submit-button"
                                    disabled={{ valid: false }} >
                                    <b>Login</b>
                                    <i className="fas fa-arrow-circle-right right"></i>
                                </ButtonInput>
                            </Form>
                            <br/>
                            <div className="signin-form-link-section">
                                <button
                                    className="signin-form-link"
                                    onClick={ () => updateFormState( 'REGISTER' )}>
                                        Create a account
                                </button>
                                <button
                                    className="signin-form-link"
                                    onClick={ () => updateFormState( 'FORGOTPASS' ) } >
                                        Forgot Password
                                </button>
                            </div>
                        </>),
                        'REGISTER': 
                        <>
                            <h4 className="white-text">Register</h4>
                            <Form model="register" onSubmit={handleRegistration}>
                                <p className="signin-header-text" >Enter your details to register</p>
                                <div className="row">
                                    <div className="col">
                                        <TextInput
                                            aria-label="Email"
                                            className="grey darken-4 white-text signin-text-field"
                                            model=".username"
                                            type="email"
                                            id="signIn-email-field"
                                            placeholder="Email"
                                            required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <TextInput
                                            aria-label="Password"
                                            className="grey darken-4 white-text signin-text-field"
                                            model=".password"
                                            type="password"
                                            id="register-password-field"
                                            placeholder="Password"
                                            required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <TextInput
                                            aria-label="Confirm Password"
                                            className="grey darken-4 white-text signin-text-field"
                                            model=".conf_password"
                                            type="password"
                                            id="register-conf-password-field"
                                            placeholder="Confirm password"
                                            required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <TextInput
                                            aria-label="Registration number"
                                            className="grey darken-4 white-text signin-text-field"
                                            model=".displayName"
                                            type="text"
                                            id="register-displayName-field"
                                            placeholder="Display Name"
                                            required />
                                    </div>
                                </div>
                                <ButtonInput 
                                    type="submit"
                                    model="register"
                                    className="btn-flat waves-effect waves-light signin-form-submit-button"
                                    disabled={{ valid: false }} >
                                    <b>Register</b>
                                    <i class="fas fa-user-plus right"></i>
                                </ButtonInput>
                            </Form>
                            <br></br>
                            <button className="signin-form-link" onClick={()=>updateFormState( 'SIGNIN' )}>Login
                            </button>
                        </>,
                        'FORGOTPASS': 
                        <>
                            <h4 className="white-text">Forgot password</h4>
                            <Form model="forgot_password" onSubmit={handleForgotPass} >
                                <p className="signin-header-text" >Enter your registered email address to get token.</p>
                                <div className="row">
                                    <div className="col">
                                        <TextInput
                                            aria-label="Email"
                                            className="grey darken-4 white-text signin-text-field"
                                            model=".username"
                                            type="email"
                                            id="signIn-email-field"
                                            placeholder="Email"
                                            required />
                                    </div>
                                </div>
                                <ButtonInput 
                                    type="submit"
                                    model="forgot_password"
                                    className="btn-flat waves-effect waves-light signin-form-submit-button"
                                    disabled={{ valid: false }} >
                                    <b>Send email</b>
                                    <i className="fa fab fa-envelope right"></i>
                                </ButtonInput>
                            </Form>
                            <br/>
                            <Form model="token" onSubmit={handleToken}>
                            <p className="signin-header-text" >Enter token sent to your email.</p>
                                <div className="row">
                                    <div className="col">
                                        <TextInput
                                            aria-label="Token"
                                            className="grey darken-4 white-text signin-text-field"
                                            model=".token"
                                            type="text"
                                            id="signIn-token-field"
                                            placeholder="Token"
                                            required />
                                    </div>
                                </div>
                                <ButtonInput 
                                    type="submit"
                                    model="token"
                                    className="btn-flat waves-effect waves-light signin-form-submit-button"
                                    disabled={{ valid: false }} >
                                    <b>Submit</b>
                                    <i className="fa fab fa-key right"></i>
                                </ButtonInput>
                            </Form>
                            <div className="signin-form-link-section">
                                <button
                                    className="signin-form-link"
                                    onClick={ () => updateFormState( 'REGISTER' )}>
                                        Create a account
                                </button>
                                <button
                                    className="signin-form-link"
                                    onClick={ () => updateFormState( 'SIGNIN' ) } >
                                        Sign in
                                </button>
                            </div>
                        </>
                    }[formState] ||
                    <>
                        <div class="signin-fatal-error red white-text btn-flat">
                            <i className="fa fa-exclamation-circle left"></i>
                            The Signin component was unable to determine it's current state.
                        </div>
                        <p className="white-text">Please inform the developers of the issue.</p>
                    </>
                }
                </div>
           </div>
        </div>
    </>);
}

export default SignIn;