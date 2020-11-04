import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Control, Errors, actions } from 'react-redux-form';
import {logout, baseUrl} from '../redux/ActionCreators';
import M from 'materialize-css';

function Navbar(props){
    var bars=useRef(null);
    var logo=useRef(null);
    const [isOpen,setIsOpen] = useState(false);
    const [isUserOpen,setIsUserOpen] = useState(false);
    const [isResetOpen,setIsResetOpen] = useState(false);
    const [page,setPage] = useState('/home');
    const user=useSelector(state=>state.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        setPage(window.location.pathname);
    },[page]);

    const handleReset=(values)=>{
        if(values.password!==values.conf_password){
            M.toast({html:'password do not match'});
        }else{
            fetch(baseUrl+'/users/reset_password',{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(values),
                credentials:'include'
            })
            .then(response=>{
                if(response.ok){ 
                    M.toast({html:'Password changed successfully'});
                    dispatch(actions.reset('reset_password'));
                    setIsResetOpen(false);
                }
                else throw new Error(response.status+' '+response.statusText);
            },err=>{throw err;})
            .catch(err=>M.toast(err));
        }
    };

    function handleScroll(){
        if(logo.current&&(page=='/home'||page=='/signIn')){
            if(window.pageYOffset>window.innerHeight){
                logo.current.style.visibility='visible';
            }else{
                logo.current.style.visibility='hidden';
            }
        }
    }
    if(logo.current&&!(page=='/home'||page=='/signIn')){
        logo.current.style.visibility='visible';
    }
    window.onscroll=()=>{handleScroll();}; 
    var home;
    var sign;
    if(page=='/home'){
        home=[
            <a className="btn-flat nav-item" href="#about">About</a>,
            <a className="btn-flat nav-item" href="#domain">Domains</a>,
            <a className="btn-flat nav-item" href="#board">Board</a>
        ];
    }else{
        home=<a className="btn-flat nav-item" href="/home">Home</a>;
    }
    if(user.loggedIn){   
        sign=<a className="btn-flat waves-effect" onClick={()=>setIsUserOpen(!isUserOpen)}><i className="fa fa-user-astronaut" ref={bars}/></a>;
    }else{
        sign=<a className="btn-flat nav-item" href="/signin">Sign In</a>;
    }
    /*if(isOpen)
        {bars.current.style.color='#16addb';}
    else 
        {bars.current.style.color='white';}
        */

       
    return(
        <div className="nav-wrapper">
            <div className="navbar">
            {
                    isResetOpen&&(
                        <div className="reset-mod">
                            <div className="row">
                                <a className="btn-flat waves-effect white-waves" onClick={()=>setIsResetOpen(false)}>
                                    <i className="fab fa fa-times"/></a>
                            </div>
                            <div className="row">
                                <h4>Reset Password</h4>
                            </div>
                            <Form model="reset_password" onSubmit={handleReset}>
                                <div className="row">
                                    <div className="input-field col s10">
                                        <Control.password model=".password" id="reset_password" className="white-text"/>
                                        <label htmlFor="reset_password">New Password</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s10">
                                        <Control.password model=".conf_password" id="reset_password_conf" className="white-text" />
                                        <label htmlFor="reset_password_conf">Confirm Password</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <button className="btn-flat waves-effect white-waves teal" type="submit">Submit</button>
                                </div>
                            </Form>
                        </div>
                        )
                }
                <a><img className="responsive-img nav-logo" src={"/assets/images/logo.png"} ref={logo}/></a>
                {
                (window.innerWidth>600)&&
                    (<div className="pages">
                        {home}
                        <a className="btn-flat nav-item" href="/scavenger">Scavenger</a>
                        {sign}
                    
                </div>) 
                }
                {
                    (window.innerWidth>600)&&isUserOpen&&user.loggedIn&&(
                        <div className="navbar-loggedIn">
                            <a className="btn-flat nav-item" onClick={()=>{setIsResetOpen(true);setIsUserOpen(false);}}>Reset Password</a>
                            <a className="btn-flat nav-item" onClick={()=>{dispatch(logout());setIsUserOpen(false);}}>Logout</a>
                        </div>
                    )
                }
                {
                    (window.innerWidth<600)&&(
                        <a className="btn-flat waves-effect" onClick={()=>setIsOpen(!isOpen)}><i className="fa fa-bars" ref={bars}/></a>
                    )
                }
            </div>
            {
                    (window.innerWidth<600)&&isOpen&&(
                        <div className="navbar-mobile">
                            <a className="btn-flat nav-item" href="#about">About</a>
                            <a className="btn-flat nav-item" href="#domain">Domains</a>
                            <a className="btn-flat nav-item" href="#board">Board</a>
                            <a className="btn-flat nav-item" href="/signin" >Sign In</a>
                        </div>
                    )
                }
        </div>
    );
}

export default Navbar;