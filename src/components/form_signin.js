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

// const onSuccess = (googleUser) => {
//     const profile = googleUser.getBasicProfile();
//     console.log(profile);
//   }


class FormSignIn extends Component {
    doLogin = ()  =>{
        this.props.signIn().then(() =>{
            console.log("looogiiin", this);
            this.props.history.push("/profile");
        });
    };
    doLoginWithEmail = (data)  =>{
        this.signInEmail(data).then(() =>{
            console.log("looogiiin email", this);
            console.log("cek token sebelum redirect", localStorage.getItem('token'));
            this.props.history.push("/profile");
        });
    };
    // onSignIn = (googleUser) => {
    //     var profile = googleUser.getBasicProfile();
    //     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    //     console.log('Name: ' + profile.getName());
    //     console.log('Image URL: ' + profile.getImageUrl());
    //     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    //   }


    // signInEmail = async (googleUser) => {
    //     // onSignIn = async (googleUser) => {
    //     const tokenGoogle = googleUser.tokenId;
    //     // console.log("cek token sebelum axios", tokenGoogle)
    //     const urlToken = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + tokenGoogle 
    //     await axios({
    //         method: 'get',
    //         url: urlToken
    //         // headers: {
    //         //   Authorization: 'Bearer ' + token
    //         // }
    //     }).then(function(response) {
    //         // console.log("Get identity google berhasil", response)
    //         // console.log("Get identity google berhasil", response.data.email)
    //         // console.log("Get identity google berhasil", response.data.name)
    //         // console.log("Get identity google berhasil", response.data.picture)
    //         // --------------------------------------------------------------------------
    //         axios({
    //             method: 'post',
    //             url: "http://localhost:5000/login/email",
    //             data: {
    //                 email: response.data.email,
    //                 display_name: response.data.name,
    //                 profile_picture: response.data.picture
    //             }
    //         }).then(function(response) {
    //             console.log("Login dengan identity google berhasil", response)
    //             console.log("cek token sebelum dimasukkan ke localstorage", response.data.token)
    //             localStorage.setItem('token', response.data.token)
    //             store.setState({
    //                 is_login: true,
    //                 // token: response.data.token,
    //             });
    //             // const self = this;
    //             // self.props.history.push("/profile");
    //             // console.log("Get identity google berhasil", response.data.email)
    //         }).catch(function(error) {
    //             console.log("Login Gagal dengan identity google", error);
    //         });
    //         // --------------------------------------------------------------------------
    //     }).catch(function(error) {
    //         console.log("Gagal get identity google", error);
    //     });
    //     // console.log(googleUser);
    //     // console.log(googleUser.tokenId);
    //     // this.props.history.push("/profile");
    // }

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
        }
        ).catch(function(error) {
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
                    <span className="pad20grey" >Masuk sekarang untuk menikmati fitur Lahanku</span>
                    <div className="card-body">
                        <form className="form-horizontal" onSubmit={e => e.preventDefault()}>
                            <div className="form-group">
                                <label for="username" className="cols-sm-2 control-label grey bold">Username</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"></span>
                                        <input type="text" className="form-control font14px" name="username" id="username" placeholder="Masukkan username Anda di sini" onChange= {e => this.props.setField(e)} required autofocus/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="password" className="cols-sm-2 control-label grey bold">Password</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"></span>
                                        <input type="password" className="form-control font14px" name="password" id="password" placeholder="Masukkan password Anda di sini" onChange= {e => this.props.setField(e)} required/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row justify-content-center">
                                <button type="button" className="btn btn-common" onClick={()=> this.doLogin()}>Masuk</button> <br/>
                            </div>
                            <div class="form-group row justify-content-center">
                                atau 
                            </div>
                            <div class="form-group row justify-content-center">
                                <br/>
                                <GoogleLogin
                                    clientId="776063172831-jhej4256uqt8unt4itba1ceel0h06rr7.apps.googleusercontent.com"
                                    buttonText="Masuk dengan akun Google"
                                    onSuccess={(e)=> this.doLoginWithEmail(e)}
                                    // onSuccess={(e)=> this.onSignIn(e)}
                                    // onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div> 
                            <div className="row justify-content-center">
                                <span className="grey text-center">
                                Belum punya akun? 
                                </span>
                            </div>
                            <div className="row justify-content-center">

                                <span className="grey">Daftar <Link to ="/signup" className="blue">disini</Link></span>
                            </div>
                            <div className="row justify-content-center">
                                {/* <div class="g-signin2" data-onsuccess="onSignIn"></div> */}
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


