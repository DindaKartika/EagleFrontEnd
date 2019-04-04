import React, { Component } from 'react';
import{ Link } from "react-router-dom";
import {Redirect} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from '../store';
import {withRouter} from "react-router-dom";
import GoogleLogin from 'react-google-login';
import axios from "axios";


const responseGoogle = (response) => {
    console.log(response);
  }

class FormSignIn extends Component {
    doLogin = ()  =>{
        this.props.signIn().then(() =>{
            this.props.history.push("/profile");
        });
    };

    doLoginWithEmail = (data)  =>{
        this.signInEmail(data).then(() =>{
            this.props.history.push("/profile");
        });
    };

    signInEmail = async (googleUser) => {
        const tokenGoogle = googleUser.tokenId;
        const urlToken = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + tokenGoogle 
        await axios({
            method: 'get',
            url: urlToken
        }).then( async (response) => {
            await axios({
                method: 'post',
                url: "http://localhost:5000/login/email",
                data: {
                    email: response.data.email,
                    display_name: response.data.name,
                    profile_picture: response.data.picture
                }
            }).then(function(response) {
                localStorage.setItem('token', response.data.token)
                store.setState({
                    is_login: true,
                });
            }).catch(function(error) {
                console.log("Login Gagal dengan identity google", error);
            });
        }).catch(function(error) {
            console.log("Gagal get identity google", error);
        });
    }
    
      
  render() {
    return (
    <div className="container fontroboto">
        <div className="row justify-content-center">
            <div className="col-md-9">
                <div className="card">
                    <span className="daftar bold">Masuk</span>
                    <span className="pad20grey" >Masuk sekarang untuk menikmati fitur tanah air</span>
                    <div className="card-body">
                        <form className="form-horizontal" onSubmit={e => e.preventDefault()}>
                            <div className="form-group">
                                <label for="username" className="cols-sm-2 control-label grey bold">Username</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        {/* <span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span> */}
                                        <input type="text" className="form-control font14px" name="username" id="username" placeholder="Enter your Username" onChange= {e => this.props.setField(e)} required autofocus/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="password" className="cols-sm-2 control-label grey bold">Password</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        {/* <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span> */}
                                        <input type="password" className="form-control font14px" name="password" id="password" placeholder="Enter your Password" onChange= {e => this.props.setField(e)} required/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group basecolor">
                                <button type="button" className="btn btn-primary btn-lg btn-block login-button colorsubmit" onClick={()=> this.doLogin()}>Masuk</button>
                            </div> 
                            <div className="row justify-content-center">
                                <span className="grey text-center">
                                Belum punya akun?
                                </span><br/>
                            </div>
                            <div className="row justify-content-center">
                                <span className="grey">Daftar <Link to ="/signup" className="blue">disini</Link></span>
                            </div>
                            <div className="row justify-content-center">
                                <GoogleLogin
                                    clientId="776063172831-jhej4256uqt8unt4itba1ceel0h06rr7.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={(e)=> this.doLoginWithEmail(e)}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
  }
}

// export default FormSignIn;
export default connect(
    "is_login", actions
)(withRouter(FormSignIn))


