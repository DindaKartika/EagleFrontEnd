// LIST IMPORT MODULE
import React, { Component } from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { actions, store } from "../store";
import { withRouter } from "react-router-dom";
import Header from "../components/header_signin";
import Footer from "../components/footer_styled";
import ListFeed from "../components/list_feed";
import { storage } from "../firebase";
import Kebun from "../components/kebun"
import { Link } from "react-router-dom";

const waUrl = "https://web.whatsapp.com/send?phone=";

//MAIN CLASS
class Profile extends Component {
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
    if (localStorage.getItem("token") === null) {
      this.props.history.push("/signin");
    }
    const token = localStorage.getItem("token");
    console.log("Cekt token setelah login", token);
    await axios({
      method: "get",
      url: "http://localhost:5000/users/profile",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(function(response) {
        if (response.data.status === "Success") {
          // console.log("login berhasil", response.data.data.id)
          store.setState({
            is_login: true
          });
          self.setState({
            id: response.data.data.id,
            username: response.data.data.username,
            email: response.data.data.email,
            display_name: response.data.data.display_name,
            headline: response.data.data.headline,
            profile_picture: response.data.data.profile_picture,
            cover_photo: response.data.data.cover_photo,
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
          });
          localStorage.setItem('id', response.data.data.id)
          localStorage.setItem('username', response.data.data.username)
        } else {
          console.log("identity unauthorized", response);
          self.props.history.replace("/signin");
        }
        // console.log("Sukses get identity", response.data.status)
      })
      .catch(function(error) {
        console.log("Gagal get identity", error);
        self.props.history.replace("/signin");
      });
  };

  getFeed = async () => {
    const self = this;
    const token = localStorage.getItem("token");
    const url = "http://localhost:5000/feeds?id_user=" + self.state.id;
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

  updateProfile = async () => {
    const self = this;
    const token = localStorage.getItem("token");
    if (this.props.edit_display_name == "") {
      store.setState({
        edit_display_name: self.state.display_name
      });
    }
    if (this.props.edit_headline == "") {
      store.setState({
        edit_headline: self.state.headline
      });
    }
    if (this.props.edit_profile_picture == "") {
      store.setState({
        edit_profile_picture: self.state.profile_picture
      });
    }
    if (this.props.edit_cover_photo == "") {
      store.setState({
        edit_cover_photo: self.state.cover_photo
      });
    }
    if (this.props.edit_gender == "") {
      store.setState({
        edit_gender: self.state.gender
      });
    }
    if (this.props.edit_date_of_birth == "") {
      store.setState({
        edit_date_of_birth: self.state.date_of_birth
      });
    }
    if (this.props.edit_address == "") {
      store.setState({
        edit_address: self.state.address
      });
    }
    if (this.props.edit_phone_number == "") {
      store.setState({
        edit_phone_number: self.state.phone_number
      });
    }
    if (this.props.edit_job == "") {
      store.setState({
        edit_job: self.state.job
      });
    }
    if (this.props.edit_facebook_link == "") {
      store.setState({
        edit_facebook_link: self.state.facebook_link
      });
    }
    if (this.props.edit_instagram_link == "") {
      store.setState({
        edit_instagram_link: self.state.instagram_link
      });
    }
    if (this.props.edit_twitter_link == "") {
      store.setState({
        edit_twitter_link: self.state.twitter_link
      });
    }
    await axios({
      method: "get",
      url: "http://localhost:5000/users/profile",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(function(response) {
        const data = {
          display_name: self.props.edit_display_name,
          headline: self.props.edit_headline,
          profile_picture: self.props.edit_profile_picture,
          cover_photo: self.props.edit_cover_photo,
          gender: self.props.edit_gender,
          date_of_birth: self.props.edit_date_of_birth,
          address: self.props.edit_address,
          phone_number: self.props.edit_phone_number,
          job: self.props.edit_job,
          facebook_link: self.props.edit_facebook_link,
          instagram_link: self.props.edit_instagram_link,
          twitter_link: self.props.edit_twitter_link
        };
        return axios({
          method: "patch",
          url: "http://localhost:5000/users/profile/" + self.state.id,
          data: data,
          headers: {
            Authorization: "Bearer " + token
          }
        }).then(function(response) {
          console.log("SUCCESS");
        });
      })
      .catch(function(error) {
        console.log("Gagal Update identity", error);
        // self.props.history.replace("/signin");
      });
  };

  handleProfilePictureChange = event => {
    this.setState({
      image1: event.target.files[0]
    });
    // console.log(event.target.files);
  };

  handleUploadProfilePicture = () => {
    const { image1 } = this.state;

    const uploadTask = storage.ref(`images/${image1.name}`).put(image1);
    uploadTask.on(
      "state_changed",
      snapshot => {
        //   progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progressProfilePicture: progress });
      },
      error => {
        //   error function
        console.log(error);
      },
      () => {
        //   complete function
        storage
          .ref("images")
          .child(image1.name)
          .getDownloadURL()
          .then(uerel => store.setState({ edit_profile_picture: uerel }));
      }
    );
  };

  handleCoverPhotoChange = event => {
    this.setState({
      image2: event.target.files[0]
    });
    // console.log(event.target.files);
  };

  handleUploadCoverPhoto = () => {
    const { image2 } = this.state;

    const uploadTask = storage.ref(`images/${image2.name}`).put(image2);
    uploadTask.on(
      "state_changed",
      snapshot => {
        //   progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progressCoverPhoto: progress });
      },
      error => {
        //   error function
        console.log(error);
      },
      () => {
        //   complete function
        storage
          .ref("images")
          .child(image2.name)
          .getDownloadURL()
          .then(uerel => store.setState({ edit_cover_photo: uerel }));
      }
    );
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
          <button className="btn btn-outline-success addpost-btn">
            Tambahkan post
          </button>
          <Link to="/input-field">
          <button className="btn btn-outline-success addpost-btn">
            Tambahkan lahan
          </button>
          </Link>
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
                <div
                  className="display-edit"
                  style={{ display: this.state.edit ? "none" : "block" }}
                >
                  <button
                    className="btn btn-success"
                    onClick={() => this.changeEditState()}
                  >
                    Perbarui profil
                  </button>

                  {/* TEST */}
                  <div>
                  
                    <a href={waUrl + this.props.current_phone_number} target="_blank">
                    <button className="btn btn-success"><i class="fa fa-whatsapp my-wa-float" /> Hubungi via Whatsapp</button>
                    </a>
                    
                  </div>
                  {/* TEST */}
                </div>
                <div
                  className="display-edit"
                  style={{ display: this.state.edit ? "block" : "none" }}
                >
                  <button
                    className="btn btn-outline-success"
                    onClick={() => this.changeEditState()}
                  >
                    Batalkan edit
                  </button>
                  
                </div>
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
                <div
                  className="edit"
                  style={{ display: this.state.edit ? "block" : "none" }}
                >
                  <div className="row">Edit Profil</div>
                  <hr />
                  <form
                    class="form-container"
                    action=""
                    method="post"
                    onSubmit={e => e.preventDefault()}
                  >
                    {this.props.current_display_name == "" && (
                      <div class="row">
                        <div class="col-md-3">
                          <label for="edit_display_name">Nama *</label>
                        </div>
                        <div class="col-md-9">
                          <input
                            required
                            type="text"
                            id="edit_display_name"
                            name="edit_display_name"
                            placeholder={this.state.display_name}
                            onChange={e => this.props.setField(e)}
                          />
                        </div>
                      </div>
                    )}
                    {this.props.current_display_name != "" && (
                      <div class="row">
                        <div class="col-md-3">
                          <label for="edit_display_name">Nama</label>
                        </div>
                        <div class="col-md-9">
                          <input
                            type="text"
                            id="edit_display_name"
                            name="edit_display_name"
                            placeholder={this.state.display_name}
                            onChange={e => this.props.setField(e)}
                          />
                        </div>
                      </div>
                    )}
                    <div class="row">
                      <div class="col-md-3">
                        <label for="edit_headline">Deskripsi</label>
                      </div>
                      <div class="col-md-9">
                        <input
                          type="text"
                          id="edit_headline"
                          name="edit_headline"
                          placeholder={this.state.headline}
                          onChange={e => this.props.setField(e)}
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <label for="edit_profile_picture">
                          Link foto profil
                        </label>
                      </div>
                      <div class="col-md-9">
                        <progress
                          value={this.state.progressProfilePicture}
                          max="100"
                        />
                        <br />
                        <input
                          type="file"
                          id="edit_profile_picture"
                          name="edit_profile_picture"
                          placeholder={this.state.profile_picture}
                          onChange={this.handleProfilePictureChange}
                        />
                        <button onClick={this.handleUploadProfilePicture}>
                          Upload foto profil
                        </button>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <label for="edit_cover_photo">Link foto kover</label>
                      </div>
                      <div class="col-md-9">
                        <progress
                          value={this.state.progressCoverPhoto}
                          max="100"
                        />
                        <br />
                        <input
                          type="file"
                          id="edit_cover_photo"
                          name="edit_cover_photo"
                          placeholder={this.state.cover_photo}
                          onChange={this.handleCoverPhotoChange}
                        />
                        <button onClick={this.handleUploadCoverPhoto}>
                          Upload foto kover
                        </button>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <label for="gender">Jenis Kelamin</label>
                      </div>
                      <div class="col-md-9">
                        <select
                          onClick={e => this.props.setEditGender(e)}
                          id="gender"
                        >
                          <option value="" disabled selected />
                          <option value="M">Laki-laki</option>
                          <option value="F">Perempuan</option>
                        </select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <label for="edit_date_of_birth">Tanggal lahir</label>
                      </div>
                      <div class="col-md-9">
                        <input
                          type="text"
                          id="edit_date_of_birth"
                          name="edit_date_of_birth"
                          placeholder={this.state.date_of_birth}
                          onChange={e => this.props.setField(e)}
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <label for="edit_address">Kota domisili</label>
                      </div>
                      <div class="col-md-9">
                        <input
                          type="text"
                          id="edit_address"
                          name="edit_address"
                          placeholder={this.state.address}
                          onChange={e => this.props.setField(e)}
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <label for="edit_phone_number">Nomor telefon</label>
                      </div>
                      <div class="col-md-9">
                        <input
                          type="text"
                          id="edit_phone_number"
                          name="edit_phone_number"
                          placeholder={this.state.phone_number}
                          onChange={e => this.props.setField(e)}
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <label for="edit_job">Pekerjaan</label>
                      </div>
                      <div class="col-md-9">
                        <input
                          type="text"
                          id="edit_job"
                          name="edit_job"
                          placeholder={this.state.job}
                          onChange={e => this.props.setField(e)}
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-md-3">
                        <label for="edit_facebook_link">
                          Link akun Facebook
                        </label>
                      </div>
                      <div class="col-md-9">
                        <input
                          type="text"
                          id="edit_facebook_link"
                          name="edit_facebook_link"
                          placeholder={this.state.facebook_link}
                          onChange={e => this.props.setField(e)}
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <label for="edit_instagram_link">
                          Link akun Instagram
                        </label>
                      </div>
                      <div class="col-md-9">
                        <input
                          type="text"
                          id="edit_instagram_link"
                          name="edit_instagram_link"
                          placeholder={this.state.instagram_link}
                          onChange={e => this.props.setField(e)}
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <label for="edit_twitter_link">Link akun Twitter</label>
                      </div>
                      <div class="col-md-9">
                        <input
                          type="text"
                          id="edit_twitter_link"
                          name="edit_twitter_link"
                          placeholder={this.state.twitter_link}
                          onChange={e => this.props.setField(e)}
                        />
                      </div>
                    </div>
                    <div ref={el => (this.instance = el)} />
                    <div class="row">
                      {/* <input type="submit" value="Submit" /> */}
                      <div>
                        <button
                          className="btn btn-outline-success"
                          type="submit"
                          onClick={() => this.updateProfile()}
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                  </form>
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
  "current_display_name, current_phone_number, edit_display_name, edit_headline, edit_profile_picture, edit_cover_photo, edit_gender, edit_date_of_birth, edit_address, edit_phone_number, edit_job, edit_facebook_link, edit_instagram_link, edit_twitter_link",
  actions
)(withRouter(Profile));
