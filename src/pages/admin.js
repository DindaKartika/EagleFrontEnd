// LIST IMPORT MODULE
import React, { Component } from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../store";
import { withRouter } from "react-router-dom";
import Header from "../components/header_signin";
import Footer from "../components/footer_styled";
import FeedComponent from "../components/feed_component";
import CommentComponent from "../components/comment_component";
import { Link } from "react-router-dom";
import KontenAdmin from "../components/kontenAdmin";
import ChartLuasTanah from "../components/chart_luas_tanah";
import ChartTotalPanen from "../components/chart_total_panen";

//MAIN CLASS
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Users: [],
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "luas lahan (meter persegi)",
          type: "column",
          data: []
        }
      ]
    };
  }

  componentDidMount = () => {
    const self = this;
    axios
      .get("http://0.0.0.0:5000/users/userprofile")
      .then(function(response) {
        self.setState({ Users: response.data });
        console.log("users", response.data);
        const Users = response.data;
        // const rows = []
        // for (const [index, value] of Farms.entries()) {
        // 	const rowCoordinates = []
        // 	const coordinates = JSON.parse(response.data[index].coordinates)
        // 	rowCoordinates.push(coordinates)
        // 	const centers = JSON.parse(response.data[index].center)
        // 	console.log(centers)
        // 	const data = {}
        // 	data['id'] = response.data[index].id_farm
        // 	data['id_pemilik'] = response.data[index].id_user
        // 	data['coordinates'] = rowCoordinates
        // 	data['center'] = centers
        // 	data['deskripsi'] = response.data[index].deskripsi
        // 	data['tanaman'] = response.data[index].plant_type
        // 	data['pemilik'] = response.data[index].user.display_name
        // 	data['username'] = response.data[index].user.username
        // 	rows.push(data)
        // }
        // console.log('koordinat jadi', rows)
        // self.setState({koordinat : rows})
        // localStorage.setItem('datas', JSON.stringify(rows))
        // console.log('cekdata', localStorage.getItem('datas'))
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
              <h2>Grafik Luas Tanah</h2>
              <ChartLuasTanah />
            </div>
            <div className="col-md-12">
              <h2>Grafik Total Panen</h2>
              <ChartTotalPanen />
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
