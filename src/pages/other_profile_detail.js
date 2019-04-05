// LIST IMPORT MODULE
import React, { Component } from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { actions, store } from "../store";
import { withRouter } from "react-router-dom";
import Header from "../components/header_signin";
import Footer from "../components/footer";
import ListFeed from "../components/list_feed";
import { storage } from "../firebase";
import Kebun from "../components/kebun"
import { Link } from "react-router-dom";

const waUrl = "https://web.whatsapp.com/send?phone=";

//MAIN CLASS
class OtherProfile extends Component {
  constructor(props) {
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
      cover_photo: "",
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

      listFeed: [],

      image1: null,
      progressProfilePicture: 0,

      image2: null,
      progressCoverPhoto: 0
    };
  }

  componentDidMount = async () => {
    // var $ = require("jquery");

    // const script = document.createElement("script");
    // script.src = "../js/wa.js";
    // script.async = true;
    // document.body.appendChild(script);

    // const s = document.createElement('script');
    // s.type = 'text/javascript';
    // s.async = true;
    // s.src = "../js/wa.js";
    // s.innerHTML = "document.write('TESSSSSSSSSTTT')";
    // this.instance.appendChild(s);

    // $(function() {
    //     $(".floating-wpp").floatingWhatsApp({
    //       phone: "6289687251865",
    //       popupMessage: "Welcome to Alphatech",
    //       showPopup: true,
    //       position: "right",
    //       autoOpen: false,
    //       //autoOpenTimer: 4000,
    //       message: "Hello how are you my name is Mentee ...",
    //       //headerColor: 'orange',
    //       headerTitle: "Whatsapp Message Box",
    //       buttonImage:
    //         '<img src="https://cdn0.iconfinder.com/data/icons/social-media-2091/100/social-11-512.png" />'
    //     });
    //   });

    this.getIdentity().then(() => {
      this.getFeed();
    });
  };

  getIdentity = async () => {
    const self = this;
    // if (localStorage.getItem("token") === null) {
    //   // this.props.history.push("/signin");
    // }
    const token = localStorage.getItem("token");
    console.log("Cekt token setelah login", token);
    await axios({
      method: "get",
      url: "http://localhost:5000/users/userprofile/" + self.props.user_id
      // headers: {
      //   Authorization: "Bearer " + token
      // }
    })
      .then(function(response) {
        // if (response.data.status === "Success") {
          // console.log("login berhasil", response.data.data.id)
          // store.setState({
          //   is_login: true
          // });
          self.setState({
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            display_name: response.data.display_name,
            headline: response.data.headline,
            profile_picture: response.data.profile_picture,
            cover_photo: response.data.cover_photo,
            gender: response.data.gender,
            date_of_birth: response.data.date_of_birth,
            address: response.data.address,
            phone_number: response.data.phone_number,
            facebook_link: response.data.facebook_link,
            instagram_link: response.data.instagram_link,
            twitter_link: response.data.twitter_link,
            other_link: response.data.other_link,
            created_at: response.data.created_at,
            updated_at: response.data.updated_at,
            post_count: response.data.post_count,
            job: response.data.job,
            status: response.data.status
          });
          // localStorage.setItem('id', response.data.id)
        // } else {
        //   console.log("identity unauthorized", response);
        //   // self.props.history.replace("/signin");
        // }
        // console.log("Sukses get identity", response.data.status)
      })
      .catch(function(error) {
        console.log("Gagal get identity", error);
        // self.props.history.replace("/signin");
      });
  };

  getFeed = async () => {
    const self = this;
    const token = localStorage.getItem("token");
    const url = "http://localhost:5000/feeds?id_user=" + self.props.user_id;
    axios({
      method: "get",
      url: url,
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(function(response) {
        // console.log("Get feeds berhasil", response.data)
        self.setState({
          listFeed: response.data
        });
      })
      .catch(function(error) {
        console.log("Gagal get feeds", error);
      });
    // console.log("cek after get feed", self.state)
  };

  changeEditState = async () => {
    const self = this;
    self.setState({ edit: !self.state.edit });
    // console.log("cek state", self.state)
  };

  changeShowState = async value => {
    const self = this;
    self.setState({ show: value });
  };


  render() {
    console.log("PROPS", this.props.edit_display_name);
    return (
      <div>
        <Header />
        {/* <div class="floating-wpp">Test</div> */}
        <a
          href={waUrl + this.props.current_phone_number}
          class="wa-float"
          target="_blank"
        >
          <i class="fa fa-whatsapp my-wa-float" />
        </a>
        {/* <a href={waUrl + this.props.current_phone_number} target="_blank">
          Whatsapp
        </a> */}
        <div
          className="cover-photo"
          style={{
            backgroundImage: "url(" + this.state.cover_photo + ")",
            backgroundSize: "cover"
          }}
        >
          {/* Cover Photo goes here! */}
        </div>
        <div className="container-fluid row justify-content-end strip">
        </div>
        <div className="container-fluid content-section">
          <div className="container row container-profile">
            <div className="col-md-3">
              <div
                className="profile-photo"
                style={{
                  backgroundImage: "url(" + this.state.profile_picture + ")",
                  backgroundSize: "cover"
                }}
              >
                {/* Profile image goes here! */}
                {/* <img className="img" src={this.state.profile_picture} /> */}
              </div>
              <div className="side-detail-profile">
                <div className="display-name">{this.state.display_name}</div>
                <div className="display-username">@{this.state.username}</div>
                <div className="display-address">{this.state.address}</div>
                <div className="display-date">
                  Bergabung pada {this.state.created_at.slice(0, 10)}
                </div>
                <div className="display-email">{this.state.email}</div>
                <br />
              </div>
            </div>
            <div className="col-md-9 feed-post">
              <div className="container">
                <div
                  className="display"
                  style={{ display: this.state.edit ? "none" : "block" }}
                >
                  <div className="row">
                    <button
                      className={
                        this.state.show === "post"
                          ? "btn btn-outline-success profile-content-controller active"
                          : "btn btn-outline-success profile-content-controller"
                      }
                      onClick={() => this.changeShowState("post")}
                    >
                      Postingan
                    </button>
                    <button
                      className={
                        this.state.show === "farm"
                          ? "btn btn-outline-success profile-content-controller active"
                          : "btn btn-outline-success profile-content-controller"
                      }
                      onClick={() => this.changeShowState("farm")}
                    >
                      Info lahan
                    </button>
                    <button
                      className="btn btn-outline-success profile-content-controller"
                      disabled
                    >
                      Produk
                    </button>
                  </div>
                  <hr />
                  <div
                    className="profile-post"
                    style={{
                      display: this.state.show === "post" ? "block" : "none"
                    }}
                  >
                    {/* Display Post  */}
                    <div className="post-item">
                      <div className="row">Postingan</div>
                      <hr />
                      {/* Loop content post start here */}
                      {this.state.listFeed.map((item, key) => {
                        // console.log("cek mapping function", item.content)
                        return <ListFeed key={key} data={item} />;
                      })}
                      {/* Loop content post end here */}
                    </div>
                  </div>
                  <div
                    className="profile-farm"
                    style={{
                      display: this.state.show === "farm" ? "block" : "none"
                    }}
                  >
                    <div>
                      <div className="row">Info Kebun</div>
                      <hr />
                      <Kebun/>
                      {/* Loop Content farm start here */}
                      {/* <div className="row farm-item">
                        <div className="col-md-6">
                          <div className="name-text">
                            Kebun Tersayang kampung Tidar
                          </div>
                          <div className="address-text">
                            Jl. Raya Tidar No 10 Malang
                          </div>
                          <div className="info-text">
                            <div>Tanaman: Melon</div>
                            <div>Luas tanah: 999 m2</div>
                            <div>Estimasi panen: 11-04-2019</div>
                          </div>
                          <div>
                            <button className="btn btn-success">
                              Lihat di peta
                            </button>
                          </div>
                        </div>
                      </div> */}
                      {/* Loop Content farm start here */}
                      {/* Loop Content farm start here */}
                      {/* <div className="row farm-item">
                        <div className="col-md-6">
                          <div className="name-text">Kebun kedua Tidar</div>
                          <div className="address-text">
                            Jl. Raya Tidar No 20 Malang
                          </div>
                          <div className="info-text">
                            <div>Tanaman: Semangka</div>
                            <div>Luas tanah: 777 m2</div>
                            <div>Estimasi panen: 21-04-2019</div>
                          </div>
                          <div>
                            <button className="btn btn-success">
                              Lihat di peta
                            </button>
                          </div>
                        </div>
                      </div> */}
                      {/* Loop Content farm start here */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

// export default Profile;
export default connect(
  "user_id, current_display_name, current_phone_number, edit_display_name, edit_headline, edit_profile_picture, edit_cover_photo, edit_gender, edit_date_of_birth, edit_address, edit_phone_number, edit_job, edit_facebook_link, edit_instagram_link, edit_twitter_link",
  actions
)(withRouter(OtherProfile));
