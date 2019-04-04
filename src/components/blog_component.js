import React, { Component } from 'react';
import{ Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from '../store';
import { withRouter } from "react-router-dom";

class BlogComponent extends Component {
    // postSignout = () => {
    //     this.props.is_login=false;
    //     this.props.history.push("/");
    // };
  render() {
    return (
    <div>
        <div className="col-md-3 col-12 margin20px">
            <div className="card width18">
                <img className="card-img-top" src={require('../images/img/tani.jpg')} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Profil Teknologi Pada Usaha Tani Padi dan Implikasinya terhadap Peran Pemerintah</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <Link to ="/blogdetail"  className="btn btn-primary text-center">Baca</Link>
                </div>
            </div>
        </div>     
    </div>

    );
  }
}

// export default BlogComponent;
export default connect( "", actions)
(withRouter(BlogComponent))