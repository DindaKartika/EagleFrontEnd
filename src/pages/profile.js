// LIST IMPORT MODULE
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "unistore/react";
import { actions } from '../store';
import { withRouter } from "react-router-dom";
import Header from '../components/header_signin'
import Footer from '../components/footer';
import ListFeed from '../components/list_feed'

//MAIN CLASS
class Profile extends Component {
  constructor (props) {
    super(props);
        this.state = {
            edit: false,
            show: "post",

            id: 0,
            username: "",
            email: "",
            display_name: "",
            headline: "",
            profile_picture: "",
            gender: "",
            date_of_birth: "",
            address: "",
            phone_number: "",
            facebook_link: "",
            instagram_link: "",
            twitter_link: "",
            other_link: "",
            created_at: "",
            updated_at: "",
            post_count: 0,
            job: "",
            status: "",

            listFeed: []
        };
    };

    componentDidMount = async () => {
        this.getIdentity().then(()=> {
            this.getFeed();
        });
    }

    getIdentity = async () => {
        const self = this
        const token = localStorage.getItem("token")
        await axios({
            method: 'get',
            url: 'http://localhost:5000/users/profile',
            headers: {
              Authorization: 'Bearer ' + token
            }
        }).then(function(response) {
            if (response.data.status === "Success") {
                // console.log("login berhasil", response.data.data.id)
                self.setState({
                    id: response.data.data.id,
                    username: response.data.data.username,
                    email: response.data.data.email,
                    display_name: response.data.data.display_name,
                    headline: response.data.data.headline,
                    profile_picture: response.data.data.profile_picture,
                    gender: response.data.data.gender,
                    date_of_birth: response.data.data.date_of_birth,
                    address: response.data.data.address,
                    phone_number: response.data.data.phone_number,
                    facebook_link: response.data.data.facebook_link,
                    instagram_link: response.data.data.instagram_link,
                    twitter_link: response.data.data.twitter_link,
                    other_link: response.data.data.other_link,
                    created_at: response.data.data.created_at,
                    updated_at: response.data.data.updated_at,
                    post_count: response.data.data.post_count,
                    job: response.data.data.job,
                    status: response.data.data.state
                })
            } else {
                // console.log("login gagal")
                self.props.history.replace("/signin");
            }
            // console.log("Sukses get identity", response.data.status)
        }).catch(function(error) {
        console.log("Gagal get identity", error);
        });
    };

    getFeed = async () => {
        const self = this
        const token = localStorage.getItem("token")
        const url = "http://localhost:5000/feeds?id_user=" + self.state.id
        axios({
            method: 'get',
            url: url,
            headers: {
              Authorization: 'Bearer ' + token
            }
        }).then(function(response) {
            console.log("Get feeds berhasil", response.data)
            self.setState({
                listFeed: response.data
            })
        }).catch(function(error) {
        console.log("Gagal get feeds", error);
        });
        console.log("cek after get feed", self.state)
    }

    changeEditState = async () => {
        const self = this;
        self.setState({edit: !self.state.edit});
        console.log("cek state", self.state)
        };
    
    changeShowState = async (value) => {
        const self = this;
        self.setState({show: value});
        };
    

    render() {
        return (
            <div>
                <Header />
                <div className="cover-photo">
                    {/* Cover Photo goes here! */}
                </div>
                <div className="container-fluid row justify-content-end">
                    <button className="btn btn-outline-success addpost-btn">Tambahkan post</button>
                </div>
                <div className="container-fluid content-section">
                    <div className="container row container-profile">
                        <div className="col-md-3">
                            <div className="profile-photo" style={{backgroundImage: "url(" + this.state.profile_picture + ")", backgroundSize: "cover"}}>
                                {/* Profile image goes here! */}
                                {/* <img className="img" src={this.state.profile_picture} /> */}
                            </div>
                            <div className="side-detail-profile">
                                <div className="display-name">{this.state.display_name}</div>
                                <div className="display-username">@{this.state.username}</div>
                                <div className="display-address">{this.state.address}</div>
                                <div className="display-date">{this.state.created_at.slice(0, 10)}</div>
                                <div className="display-email">{this.state.email}</div>
                                <br />
                                <div className="display-edit"><button className="btn btn-success" onClick={() => this.changeEditState()}>Perbarui profil</button></div>
                            </div>
                        </div>
                        <div className="col-md-9 feed-post">
                            <div className="container">
                                <div className="display" style={{ display: this.state.edit ? "none" : "block" }}>
                                    <div className="row">
                                        <button className={(this.state.show === "post") ? "btn btn-outline-success profile-content-controller active" : "btn btn-outline-success profile-content-controller" } onClick={() => this.changeShowState("post")}>Postingan</button>
                                        <button className={(this.state.show === "farm") ? "btn btn-outline-success profile-content-controller active" : "btn btn-outline-success profile-content-controller" } onClick={() => this.changeShowState("farm")}>Info lahan</button>
                                        <button className="btn btn-outline-success profile-content-controller" disabled>Produk</button>
                                    </div>
                                    <hr />
                                    <div className="profile-post" style={{ display: (this.state.show === "post") ? "block" : "none" }}>
                                        {/* Display Post  */}
                                        <div className="post-item">
                                            <div className="row">
                                                Postingan
                                            </div>
                                            <hr />
                                            {/* Loop content post start here */}
                                            {this.state.listFeed.map((item, key) => {
                                                // console.log("cek mapping function", item.content)
                                                return <ListFeed key={key} data={item}/>
                                            })}
                                            {/* Loop content post end here */}
                                        </div>
                                    </div>
                                    <div className="profile-farm" style={{ display: (this.state.show === "farm") ? "block" : "none" }}>
                                        <div>
                                            <div className="row">
                                                Info Kebun
                                            </div>
                                            <hr />
                                            {/* Loop Content farm start here */}
                                            <div className="row farm-item">
                                                <div className="col-md-6">
                                                    <div className="name-text">Kebun Tersayang kampung Tidar</div>
                                                    <div className="address-text">Jl. Raya Tidar No 10 Malang</div>
                                                    <div className="info-text">
                                                        <div>Tanaman: Melon</div>
                                                        <div>Luas tanah: 999 m2</div>
                                                        <div>Estimasi panen: 11-04-2019</div>
                                                    </div>
                                                    <div><button className="btn btn-success">Lihat di peta</button></div>
                                                </div>
                                            </div>
                                            {/* Loop Content farm start here */}
                                            {/* Loop Content farm start here */}
                                            <div className="row farm-item">
                                                <div className="col-md-6">
                                                    <div className="name-text">Kebun kedua Tidar</div>
                                                    <div className="address-text">Jl. Raya Tidar No 20 Malang</div>
                                                    <div className="info-text">
                                                        <div>Tanaman: Semangka</div>
                                                        <div>Luas tanah: 777 m2</div>
                                                        <div>Estimasi panen: 21-04-2019</div>
                                                    </div>
                                                    <div><button className="btn btn-success">Lihat di peta</button></div>
                                                </div>
                                            </div>
                                            {/* Loop Content farm start here */}
                                        </div>
                                    </div>
                                </div>
                                <div className="edit" style={{ display: this.state.edit ? "block" : "none" }}>
                                    <div className="row">
                                        Edit Profil
                                    </div>
                                    <hr />
                                    <form>
                                        <div class="form-group row">
                                            <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Nama Profil</label>
                                            <div class="col-sm-10">
                                                <input type="email" class="form-control form-control-sm" id="colFormLabelSm" placeholder="" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Jenis Kelamin</label>
                                            <div class="col-sm-10">
                                                <input type="email" class="form-control form-control-sm" id="colFormLabelSm" placeholder="" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Tanggal Lahir</label>
                                            <div class="col-sm-10">
                                                <input type="email" class="form-control form-control-sm" id="colFormLabelSm" placeholder="" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Nomor Handphone</label>
                                            <div class="col-sm-10">
                                                <input type="email" class="form-control form-control-sm" id="colFormLabelSm" placeholder="" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Pekerjaan saat ini</label>
                                            <div class="col-sm-10">
                                                <input type="email" class="form-control form-control-sm" id="colFormLabelSm" placeholder="" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Alamat tinggal</label>
                                            <div class="col-sm-10">
                                                <input type="email" class="form-control form-control-sm" id="colFormLabelSm" placeholder="" />
                                            </div>
                                        </div>
                                        <div><button className="btn btn-outline-success">Simpan</button></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

// export default Profile;
export default connect( "", actions)
(withRouter(Profile));