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
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand" href="#">LOGO</a>
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            {/* <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li> */}
            <li className="nav-item ">
                <Link to="/allproduct" className="nav-link">Tentang Kami</Link>
            </li>
            <li className="nav-item ">
                <Link to="/myproduct" className="nav-link">Blog</Link>
            </li>
          </ul>
          <Link to="/signin" className="btn btn-outline-success"><span className="cwhite">Masuk</span></Link>
        </div>
      </nav>
    );
  }
}

export default Header;