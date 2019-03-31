import React, { Component } from 'react';
import '../css/main.css';
import '../css/bootstrap.min.css'
import{ Link } from "react-router-dom";
import {Redirect} from "react-router-dom";
import {connect} from "unistore/react";
import {actions} from '../store';
import {withRouter} from "react-router-dom";

class FormRegister extends Component {
    doRegister = ()  =>{
        this.props.register().then(() =>{
            console.log("do register", this);
            if(this.props.is_register == true){
                this.props.history.push("/signin");
            } else{
                this.props.history.push("/signup");
            }
        });
    };
    render() {
    return (
    <div className="container fontroboto">
        <div className="row justify-content-center">
            <div className="col-md-9">
                <div className="card">
                    <span className="daftar bold">Daftar</span>
                    <span className="pad20grey" >Satu langkah lagi bergabung tanah air</span>
                    <div className="card-body">

                        <form className="form-horizontal" onSubmit={e => e.preventDefault()}>

                            <div className="form-group">
                                <label for="email" className="cols-sm-2 control-label grey bold">E-mail</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                                        <input type="text" className="form-control font14px" name="email" id="email" placeholder="Email@domain.com" 
                                        onChange= {e => this.props.setField(e)} required autofocus />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="email_confirmation" className="cols-sm-2 control-label grey bold">Confirm E-mail</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                                        <input type="text" className="form-control font14px" name="email_confirmation" id="email" 
                                        onChange= {e => this.props.setField(e)} required autofocus placeholder="Email@domain.com" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="username" className="cols-sm-2 control-label grey bold">Username</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
                                        <input type="text" className="form-control font14px" name="username" id="username" 
                                        onChange= {e => this.props.setField(e)} required autofocus placeholder="Enter your Username" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="password" className="cols-sm-2 control-label grey bold">Password</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                        <input type="password" className="form-control font14px" name="password" id="password" 
                                        onChange= {e => this.props.setField(e)} required autofocus placeholder="Enter your Password" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="password_confirmation" className="cols-sm-2 control-label grey bold">Confirm Password</label>
                                <div className="cols-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                        <input type="password" class="form-control font14px" name="password_confirmation" id="password_confirmation" 
                                        onChange= {e => this.props.setField(e)} required autofocus placeholder="Confirm your Password" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group basecolor">
                                <button type="button" className="btn btn-primary btn-lg btn-block login-button colorsubmit" onClick={()=> this.doRegister()} >DAFTAR</button>
                            </div> 
                            <div className="row justify-content-center">
                                <span className="grey text-center">
                                Sudah punya akun?
                                </span><br/>
                            </div>
                            <div className="row justify-content-center">
                                <span className="grey">login <Link to ="/signin" className="blue">disini</Link></span>
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

// export default FormRegister;
export default connect(
    "is_login, is_register", actions
)(withRouter(FormRegister))
