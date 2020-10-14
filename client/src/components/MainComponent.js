import React from 'react';
import {Switch,Route,withRouter,Redirect} from 'react-router-dom';
import Home from './HomeComponent';
import SignIn from './SignInComponent';
import Footer from './FooterComponent';
import Code from './CodeComponent';

function Main(){
    return(
        <div>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/signIn" component={SignIn}/>
                <Route path="/code" component={Code}/>
                <Redirect to="/home"/>
            </Switch>
            <Footer />
        </div>
    );
}

export default Main;
