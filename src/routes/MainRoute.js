import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import SignUp from "../pages/signup";

// const MainRoute = () => {
class MainRoute extends Component {
    render() {
        // console.log("test")
        return (
            <Switch>
                <Route exact path="/signup" component={SignUp}/>
                {/* <Route exact path = "/allproduct" component={AllProduct}/> */}
    
            </Switch>
        );
    }
}

export default MainRoute;