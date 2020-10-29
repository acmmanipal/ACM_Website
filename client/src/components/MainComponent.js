import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Navbar from './NavComponent';
import Home from './HomeComponent';
import SignIn from './SignInComponent';
import Footer from './FooterComponent';
import Code from './CodeComponent';
import ContestMenu from './ContestMenu';
import Scavenger from './ScavengerComponent';

function Main(){
    return(
        <div>
            <Navbar/>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/signIn" component={SignIn}/>
                <Route path="/code" component={Code}/>
                <Route path="/contest" component={ContestMenu}/>
                <Route path="/scavenger" component={Scavenger}/>
                <Redirect to="/home"/>
            </Switch>
            <Footer />
        </div>
    );
}

export default Main;
