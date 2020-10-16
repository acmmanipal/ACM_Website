import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Home from './HomeComponent';
import SignIn from './SignInComponent';
import Footer from './FooterComponent';
import Code from './CodeComponent';
import ContestMenu from './ContestMenu';

function Main(){
    return(
        <div>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/signIn" component={SignIn}/>
                <Route path="/code" component={Code}/>
                <Route path="/contest" component={ContestMenu}/>
                <Redirect to="/home"/>
            </Switch>
            <Footer />
        </div>
    );
}

export default Main;
