import React, { Component } from 'react';
import '../css/main.css';
import '../css/bootstrap.min.css'
import{ Link } from "react-router-dom";

class FormSignIn extends Component {
    // postSignout = () => {
    //     this.props.is_login=false;
    //     this.props.history.push("/");
    // };
  render() {
    return (
    <div className="container fontroboto">
        <div className="row justify-content-center">
            <div className="col-md-9">
                <div className="card">
                    <span className="daftar bold">Masuk</span>
                    <span className="pad20grey" >Masuk sekarang untuk menikmati fitur tanah air</span>
                    <div className="card-body">

                        <form className="form-horizontal" method="post" action="#">
                            <div className="form-group">
                                <label for="username" className="cols-sm-2 control-label grey bold">Username</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
                                        <input type="text" className="form-control font14px" name="username" id="username" placeholder="Enter your Username" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="password" className="cols-sm-2 control-label grey bold">Password</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                        <input type="password" className="form-control font14px" name="password" id="password" placeholder="Enter your Password" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group basecolor">
                                <button type="button" className="btn btn-primary btn-lg btn-block login-button colorsubmit">Masuk</button>
                            </div> 
                            <div className="row justify-content-center">
                                <span className="grey text-center">
                                Belum punya akun?
                                </span><br/>
                            </div>
                            <div className="row justify-content-center">
                                <span className="grey">Daftar <Link to ="/" className="blue">disini</Link></span>
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

export default FormSignIn;

