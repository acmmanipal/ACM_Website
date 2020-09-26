import React from 'react';

function Footer(props){
    return (
    <footer className="page-footer" style={{backgroundColor:"black",marginBottom:"auto"}}>
            <div className="row">
                <div className="col s12 l4">
                    <div className="container">
                        <img className="responsive-img" src="/assets/images/logo.png"/>
                    </div>
                </div>
                <div className="col s12 l4">
                    <h2>Association Of Computing Machinery , Manipal</h2>
                </div>
                <div className="col s12 l4">
                    (Contact info)
                </div>
            </div>
    </footer>
    );
}

export default Footer;