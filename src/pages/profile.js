// LIST IMPORT MODULE
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "unistore/react";
import { actions } from '../store';
import { withRouter } from "react-router-dom";
import Header from '../components/header_signin'
import Footer from '../components/footer';

//MAIN CLASS
class Profile extends Component {
  constructor (props) {
    super(props);
        this.state = {
            edit: false,
            show: "post"
        };
    };

    changeEditState = async () => {
        // console.log("Test state edit")
        const self = this;
        await self.setState({edit: !self.state.edit});
        // console.log(this.props.auth_state)
        // console.log(self.state.edit)
        };
    
    changeShowState = async (value) => {
        // console.log("Test state edit")
        const self = this;
        await self.setState({show: value});
        // console.log(this.props.auth_state)
        // console.log(self.state.edit)
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
                            <div className="profile-photo">
                                {/* Profile image goes here! */}
                            </div>
                            <div className="side-detail-profile">
                                <div>Display Name</div>
                                <div>@username</div>
                                <div>Alamat</div>
                                <div>Bergabung Dengan</div>
                                <div>email@domain.com</div>
                                <br />
                                <div><button className="btn btn-success" onClick={() => this.changeEditState()}>Perbarui profil</button></div>
                            </div>
                        </div>
                        <div className="col-md-9 feed-post">
                            <div className="container">
                                <div className="display" style={{ display: this.state.edit ? "block" : "none" }}>
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
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <span className="displayname-text">Display Name</span>
                                                    <span className="username-text">@username</span>
                                                </div>
                                                <div className="col-md-6 date-container-text">
                                                    <span className="date-text">Date | </span>
                                                    <span className="date-text">Time</span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <p className="content-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra placerat leo, eget mattis sapien mollis consectetur. In hac habitasse platea dictumst. Etiam et ante diam. Pellentesque scelerisque sed ante ut egestas. Vivamus efficitur, lorem mattis varius convallis, nisi mauris convallis sapien, vitae ultrices urna ligula volutpat leo. Pellentesque vel urna felis. Proin fringilla metus sed tincidunt volutpat. Pellentesque vulputate nulla ut hendrerit dapibus. Vivamus enim ex, sollicitudin vel orci ac, ultricies laoreet augue. </p>
                                            </div>
                                            <div className="row justify-content-between">
                                                <span className="attribute-text">Tag</span>
                                                <span className="attribute-text">Comments</span>
                                                <span className="attribute-text">Likes</span>
                                            </div>
                                            <div className="row comment-area">
                                                <div className="col-md-2"></div>
                                                <div className="col-md-10">
                                                    {/* Loop content comment start here */}
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <span className="displayname-text">Display Name</span>
                                                            <span className="username-text">@username</span>
                                                        </div>
                                                        <div className="col-md-6 date-container-text">
                                                            <span className="date-text">Date | </span>
                                                            <span className="date-text">Time</span>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <p className="content-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra placerat leo, eget mattis sapien mollis consectetur. In hac habitasse platea dictumst. Etiam et ante diam. Pellentesque scelerisque sed ante ut egestas. Vivamus efficitur, lorem mattis varius convallis, nisi mauris convallis sapien, vitae ultrices urna ligula volutpat leo. Pellentesque vel urna felis. Proin fringilla metus sed tincidunt volutpat. Pellentesque vulputate nulla ut hendrerit dapibus. Vivamus enim ex, sollicitudin vel orci ac, ultricies laoreet augue. </p>
                                                    </div>
                                                    <div className="row justify-content-end">
                                                        <span className="attribute-text">Likes</span>
                                                    </div>
                                                    {/* Loop content comment end here */}
                                                    {/* Loop content comment start here */}
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <span className="displayname-text">Display Name</span>
                                                            <span className="username-text">@username</span>
                                                        </div>
                                                        <div className="col-md-6 date-container-text">
                                                            <span className="date-text">Date | </span>
                                                            <span className="date-text">Time</span>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <p className="content-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra placerat leo, eget mattis sapien mollis consectetur. In hac habitasse platea dictumst. Etiam et ante diam. Pellentesque scelerisque sed ante ut egestas. Vivamus efficitur, lorem mattis varius convallis, nisi mauris convallis sapien, vitae ultrices urna ligula volutpat leo. Pellentesque vel urna felis. Proin fringilla metus sed tincidunt volutpat. Pellentesque vulputate nulla ut hendrerit dapibus. Vivamus enim ex, sollicitudin vel orci ac, ultricies laoreet augue. </p>
                                                    </div>
                                                    <div className="row justify-content-end">
                                                        <span className="attribute-text">Likes</span>
                                                    </div>
                                                    {/* Loop content comment end here */}
                                                    {/* Loop content post end here */}
                                                </div>
                                            </div>
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
                                <div className="edit" style={{ display: this.state.edit ? "none" : "block" }}>
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