import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../redux/ActionCreators';

function Navbar(props){
    var bars=useRef(null);
    var logo=useRef(null);
    const [isOpen,setIsOpen] = useState(false);
    const [isUserOpen,setIsUserOpen] = useState(false);
    const [page,setPage] = useState('/home');
    const user=useSelector(state=>state.user);
    const dispatch = useDispatch();
    useEffect(()=>{
        setPage(window.location.pathname);
    },[page]);
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
                            <a className="btn-flat nav-item" href="#about">Reset Password</a>
                            <a className="btn-flat nav-item" onClick={()=>dispatch(logout())}>Logout</a>
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