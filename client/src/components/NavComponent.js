import React, {useEffect, useRef, useState} from 'react';

function Navbar(props){
    var bars=useRef(null);
    var logo=useRef(null);
    const [isOpen,setIsOpen] = useState(false);
    function handleScroll(){
        if(window.pageYOffset>window.innerHeight){
            logo.current.style.visibility='visible';
        }else{
            logo.current.style.visibility='hidden';
        }
    }
    window.onscroll=()=>{handleScroll();};
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
                    <a className="btn-flat nav-item" href="#about">About</a>
                    <a className="btn-flat nav-item" href="#domain">Domains</a>
                    <a className="btn-flat nav-item" href="#board">Board</a>
                    <a className="btn-flat nav-item">Sign In</a>
                </div>) 
                }
                {
                    (window.innerWidth<600)&&(
                        <a className="btn-flat waves-effect" onClick={()=>setIsOpen(!isOpen)}><i className="fa fa-bars" ref={bars}/></a>
                    )
                }
            </div>
            {
                    isOpen&&(
                        <div className="navbar-mobile">
                            <a className="btn-flat nav-item" href="#about">About</a>
                            <a className="btn-flat nav-item" href="#domain">Domains</a>
                            <a className="btn-flat nav-item" href="#board">Board</a>
                            <a className="btn-flat nav-item">Sign In</a>
                        </div>
                    )
                }
        </div>
    );
}

export default Navbar;