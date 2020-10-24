import React from 'react';
function Footer(props){
    return (
    <footer className="page-footer" style={{backgroundColor:"black",marginBottom:0}}>
            <div className="row">
                <div className="col s12 l4">
                    <div className="container">
                        <img className="responsive-img" src="/assets/images/logo.png"/>
                    </div>
                </div>
                <div className="col s12 l4">
                    <h2>Association Of Computing Machinery , Manipal</h2>
                </div>
                <div class="col l1"></div>
                <div className="col s12 l2 ">
                    <div class="center-align">
                        <h6 style={{fontWeight:800,letterSpacing:2.5}}>
                        Connect with Us
                         </h6>
                         </div>

                    <div  style={{lineHeight:0.9}}><br/></div>
                    <div  class=" hide-on-large-only" style={{lineHeight:0.9}}><br/></div>
                    <div class="row " style={{display:"flex",justifyContent:"space-evenly"}}>
                    <div class="col s2 " ><a style={{color:"white"}} href="https://www.instagram.com/acm_manipal/?hl=en"><i class="fab fa-instagram fa-lg"></i></a></div>
                    <div class="col s2 "><a style={{color:"white"}} href="https://github.com/acmmanipal/"><i class="fab fa-github-alt fa-lg "></i></a> </div>
                    <div class="col s2 " ><a style={{color:"white"}} href="https://www.facebook.com/acm.manipal"><i class="fab fa-facebook-f fa-lg "></i></a></div>
                    <div class="col s2 " ><a style={{color:"white"}} href="https://www.linkedin.com/school/acm-manipal/>"><i class="fab fa-linkedin-in fa-lg"></i></a></div>
                    <div class="col s2 " ><a style={{color:"white"}} href="https://medium.com/the-acm-manipal-blog"><i class="fab fa-medium fa-lg"></i></a></div>
                    </div>
                </div>
                
            </div>
    </footer>
    );
}

export default Footer;