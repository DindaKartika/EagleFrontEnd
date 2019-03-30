import React, { Component } from 'react';
import '../css/main.css';
import '../css/bootstrap.min.css';
import{ Link } from "react-router-dom";

class Header extends Component {
    // postSignout = () => {
    //     this.props.is_login=false;
    //     this.props.history.push("/");
    // };
  render() {
    return (
    <div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 col-12">
                    <nav className="navbar navbar-expand-sm ">
                        <ul className="navbar-nav">
                            <li className="nav-item textcenter ">
                                <Link to="/" className="nav-link cwhite"><img src={require('../images/logo/logo1.png')} className="imglogo" alt=""/></Link>
                            </li>
                            <li className="nav-item ">
                                <Link to="/allproduct" className="nav-link fontHeaderLogin">Tentang Kami</Link>
                            </li>
                            <li className="nav-item ">
                                <Link to="/myproduct" className="nav-link fontHeaderLogin">Blog</Link>
                            </li>
                            {/* <li className="nav-item ">
                            <Link to="/signin" className="btn btn-outline-primary posMasuk"><span className="cwhite">Masuk</span></Link>
                            </li> */}
                        </ul>
                    </nav>
                </div>
                <div className="col-md-6 col-12 justify-content-end">
                    <ul className="navbar-nav">
                        <li className="nav-item textcenter ">
                        <Link to="/signin" className="btn btn-outline-primary posMasuk"><span className="cwhite">Masuk</span></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>     
    </div>

    );
  }
}

export default Header;