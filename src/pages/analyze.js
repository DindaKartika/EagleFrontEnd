// import React, { Component } from "react";
// import axios from "axios";
// import { connect } from "unistore/react";
// import { actions } from "../store";
// import { withRouter } from "react-router-dom";
// import Header from "../components/navbar";
// import Footer from "../components/footer_styled";
// import FeedComponent from "../components/feed_component";
// import CommentComponent from "../components/comment_component";
// import { Link } from "react-router-dom";
// import KontenAdmin from "../components/kontenAdmin";
// import ChartLuasTanah from "../components/chart_luas_tanah";
// import ChartTotalPanen from "../components/chart_total_panen";

// class Analyze extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       options: {
//         chart: {
//           id: "basic-bar"
//         },
//         xaxis: {
//           categories: []
//         }
//       },
//       series: [
//         {
//           name: "luas lahan (meter persegi)",
//           type: "column",
//           data: []
//         }
//       ]
//     };
//   }

//   componentDidMount = () => {
//     const self = this;
//     axios
//       .get("http://0.0.0.0:5000/analyze", {
//         params: {
//           jenis_tanaman: "wortel"
//         }
//       })
//       .then(function(response) {
//         let temp = JSON.parse(JSON.stringify(self.state)).series;
//         temp[0].data = response.data.luas_tanah;
//         self.setState({
//           options: { xaxis: { categories: response.data.dates } },
//           series: temp
//         });
//         console.log("HELLOO", response.data);
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//   };

//   render() {
//     console.log("hai", this.state.temp);
//     return (
//       <div className="Analyze">
//         <div className="row">
//           <div className="mixed-chart">
//             <Chart
//               options={this.state.options}
//               series={this.state.series}
//               type="bar"
//               width="800"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Analyze;
