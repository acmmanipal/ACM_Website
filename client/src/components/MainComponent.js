import React from 'react';
import {Switch,Route,withRouter,Redirect} from 'react-router-dom';
import Home from './HomeComponent';
import Footer from './FooterComponent';
function Main(){
    return(
        <div>
            <Switch>
                <Route to="/home" component={Home}/>
                <Redirect to="/home"/>
            </Switch>
            <Footer />
        </div>
    );
}

export default Main;
