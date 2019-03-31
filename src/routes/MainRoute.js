import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import SignUp from "../pages/signup";
import SignIn from "../pages/signin";
import Perusahaan from "../pages/perusahaan";
import App from '../pages/map';
import profile from '../pages/profile';
import Keamanan from "../pages/keamanan";
import Karir from "../pages/karir";
import Iklan from "../pages/iklan";
import PasangIklan from "../pages/pasang_iklan";
// const MainRoute = () => {
class MainRoute extends Component {
    render() {
        // console.log("test")
        return (
            <Switch>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/perusahaan" component={Perusahaan}/>
                <Route exact path="/map" component={App}/>
                <Route exact path="/profile" component={profile}/>
                <Route exact path="/keamanan" component={Keamanan}/>
                <Route exact path="/karir" component={Karir}/>
                <Route exact path="/iklan" component={Iklan}/>
                <Route exact path="/pasangiklan" component={PasangIklan}/>
                {/* <Route exact path = "/allproduct" component={AllProduct}/> */}
            </Switch>
        );
    }
}

export default MainRoute;