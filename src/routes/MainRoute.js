import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import SignUp from "../pages/signup";
import SignIn from "../pages/signin";
import Perusahaan from "../pages/perusahaan";
// const MainRoute = () => {
class MainRoute extends Component {
    render() {
        // console.log("test")
        return (
            <Switch>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/perusahaan" component={Perusahaan}/>
                {/* <Route exact path = "/allproduct" component={AllProduct}/> */}
    
            </Switch>
        );
    }
}

export default MainRoute;