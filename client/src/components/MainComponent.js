import React from 'react';
import {Switch,Route,withRouter,Redirect} from 'react-router-dom';
import Home from './HomeComponent';
import SignIn from './SignInComponent';
import Footer from './FooterComponent';

function Main(){
    return(
        <div>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/signIn" component={SignIn}/>
                <Redirect to="/home"/>
            </Switch>
            <Footer />
        </div>
    );
}

export default Main;
