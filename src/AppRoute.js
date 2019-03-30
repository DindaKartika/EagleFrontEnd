import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import MainRoute from './routes/MainRoute';
import {connect} from "unistore/react";
import {actions} from './store';


class AppRoute extends Component {

    render(){
        // console.log("test")
        return(
            <div className ="App">
                {/* <Header postSignout = {this.postSignout}/> */}
                <MainRoute />
            </div>
        );
    }
}
export default AppRoute;
// export default (withRouter(AppRoute))
