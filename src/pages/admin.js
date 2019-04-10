// LIST IMPORT MODULE
import React, { Component } from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../store";
import { withRouter } from "react-router-dom";
import Header from "../components/navbar";
import Footer from "../components/footer_styled";
import FeedComponent from "../components/feed_component";
import CommentComponent from "../components/comment_component";
import { Link } from "react-router-dom";
import KontenAdmin from "../components/kontenAdmin";
import ChartLuasTanah from "../components/chart_luas_tanah";
import ChartTotalPanen from "../components/chart_total_panen";
import ChartTotalPanen2 from "../components/chart_total_panen_2";

//MAIN CLASS
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Users: []
    };
  }

  componentDidMount = () => {
    const self = this;
    axios
      // .get("http://0.0.0.0:5000/users/userprofile")
      .get("http://3.1.9.239/users/userprofile")
      .then(function(response) {
        self.setState({ Users: response.data });
        console.log("users", response.data);
        const Users = response.data;
      })
      .catch(function(error) {
        console.log("error", error);
      });
  };

  // handleClick(e){
  //     e.preventDefault();
  //     const self = this;
  //     const {content} = e.target;
  //     var data ={};

  //     data.content = content.value;

  //     const token = localStorage.getItem("token");
  //     console.log("test token post",token)
  //     console.log("post content", data);
  //     let postFeed = {
  //         method:'post',
  //         url:'http://localhost:5000/feeds',
  //         headers: {
  //             'Authorization':'Bearer ' + token
  //         },
  //         data : data
  //     };
  //     axios(postFeed)
  //     .then(function(response){
  //         console.log(response.data);
  //         alert("post sukses")
  //         self.props.getAllFeed();
  //         window.location.reload();
  //         self.props.history.push("/newsfeed");
  //     });

  // };

  render() {
    const { Users } = this.state;
    return (
      <div>
        <Header />
        <div className="hlm-admin">
          <h3>List User</h3>
          <table>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Aktivitas</th>
            </tr>
            {Users.map((item, key) => (
              <KontenAdmin
                key={key}
                id={item.id}
                nama={item.display_name}
                alamat={item.address}
                telepon={item.phone_number}
              />
            ))}
          </table>
          <div className="row">
            <div className="col-md-12">
              <p className="h2">Grafik Total Luas Tanah (30 Hari Kebelakang)</p>
              <ChartLuasTanah />
            </div>
            <div className="col-md-12">
              <p className="h2">Grafik Perkiraan Panen per Hari (30 Hari Kedepan)</p>
              <ChartTotalPanen />
            </div>
            <div className="col-md-12">
              <p className="h2">Grafik Perkiraan Panen per Hari (30 Hari Kedepan)</p>
              <ChartTotalPanen2 />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Admin;
// export default connect( "listAllFeed, token, current_display_name, current_username, current_profile_picture", actions)
// (withRouter(NewsFeed));
