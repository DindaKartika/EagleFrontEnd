import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import SignUp from "../pages/signup";
import SignIn from "../pages/signin";
import Perusahaan from "../pages/perusahaan";
import profile from '../pages/profile';
import Keamanan from "../pages/keamanan";
import Karir from "../pages/karir";
import Iklan from "../pages/iklan";
import PasangIklan from "../pages/pasang_iklan";
import NewsFeed from "../pages/newsfeed";
import Map from '../pages/map';
import BlogDetail from '../pages/blog_detail';
import Blog from '../pages/blog';
import InputField from '../pages/inputField'
import LandingPage from '../pages/landingpage'
import Farm from '../pages/farm'
import LandingInfo from '../pages/landinginfo';
import OtherProfile from '../pages/other_profile_detail';

import '../css/landing.css';
import '../css/main2.css';
import '../fonts/line-icons.css';
import '../css/bootstrap.min.css';
import '../css/main.css';

// const MainRoute = () => {
class MainRoute extends Component {
    render() {
        // console.log("test")
        return (
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/perusahaan" component={Perusahaan}/>
                <Route exact path="/profile" component={profile}/>
                <Route exact path="/keamanan" component={Keamanan}/>
                <Route exact path="/karir" component={Karir}/>
                <Route exact path="/iklan" component={Iklan}/>
                <Route exact path="/pasangiklan" component={PasangIklan}/>
                <Route exact path="/newsfeed" component={NewsFeed}/>
                <Route exact path="/maps" component={Map}/>
                <Route exact path="/input-field" component={InputField}/>
                <Route exact path="/landingpage" component={LandingPage}/>
                <Route exact path="/maps/:id_farm" component={Farm}/>
                <Route exact path="/blogdetail" component={BlogDetail}/>
                <Route exact path="/blog" component={Blog}/>
                <Route exact path="/landing" component={LandingPage}/>
                <Route exact path="/landinginfo" component={LandingInfo}/>
                <Route exact path="/otherprofile" component={OtherProfile}/>
                {/* <Route exact path = "/allproduct" component={AllProduct}/> */}
            </Switch>
        );
    }
}

export default MainRoute;