import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store";
import Select from "react-select";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Chart from "react-apexcharts";

const optionPlant = [
  { value: "Bahan Pokok", label: "--- Bahan Pokok ---", isDisabled: true },
  { value: "Padi", label: "Padi" },
  { value: "Jagung", label: "Jagung" },
  { value: "Ubi", label: "Ubi" },
  { value: "Kentang", label: "Kentang" },
  { value: "Sayur", label: "--- Sayur ---", isDisabled: true },
  { value: "Kangkung", label: "Kangkung" },
  { value: "Kubis", label: "Kubis" },
  { value: "Lobak", label: "Lobak" },
  { value: "Mentimun", label: "Mentimun" },
  { value: "Sawi", label: "Sawi" },
  { value: "Terung", label: "Terung" },
  { value: "Tomat", label: "Tomat" },
  { value: "Wortel", label: "Wortel" },
  { value: "Lain-lain", label: "--- Lain-lain ---", isDisabled: true },
  { value: "Bawang Merah", label: "Bawang Merah" },
  { value: "Bawang Putih", label: "Bawang Putih" },
  { value: "Cabai", label: "Cabai" },
  { value: "Kacang Hijau", label: "Kacang Hijau" },
  { value: "Kacang Panjang", label: "Kacang Panjang" },
  { value: "Kacang Tanah", label: "Kacang Tanah" },
  { value: "Kedelai", label: "Kedelai" },
  { value: "Kelapa", label: "Kelapa" }
];

const optionCity = [
  { value: "", label: "Nasional" },
  { value: "Jawa Timur", label: "--- Jawa Timur ---", isDisabled: true },
  { value: "Malang", label: "Malang" },
  { value: "Surabaya", label: "Surabaya" },
  { value: "Sidoarjo", label: "Sidoarjo" }
];

class ChartLuasTanah extends Component {
  constructor(props) {
    super(props);
//     this.state = {
//       jenis_tanaman: "",
//       options: {
//       //   chart: {
//       //     id: "basic-bar"
//       //   },
//       //   xaxis: {
//       //     categories: []
//       //   }
//       // },
//         chart: {
//           zoom: {
//               enabled: false
//           }
//         },
//         colors: ['#77B6EA', '#545454'],
//         dataLabels: {
//             enabled: false
//         },
//         stroke: {
//             curve: 'straight'
//         },
//         title: {
//             text: 'Grafik Total Luas Tanah (30 Hari Kebelakang)',
//             align: 'left'
//         },
//         grid: {
//             row: {
//                 colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
//                 opacity: 0.5
//             },
//         },
//         xaxis: {
//             categories: [],
//         }
//       },
//       series: [
//         {
//           name: "luas lahan (meter persegi)",
//           // type: "column",
//           data: []
//         },
//         {
//           name: "luas lahan (meter persegi)",
//           // type: "column",
//           data: []
//         }
//       ]
//     };
//   }

this.state = {
    jenis_tanaman: "",
    total_lahan: 0,
    total_user: 0,
  options: {
      dataLabels: {
        enabled: false
      },

      stroke: {
        width: [1, 1, 4]
      },
      xaxis: {
        categories: [],
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB'
          },
          labels: {
            style: {
              color: '#008FFB',
            }
          },
          title: {
            text: "Total luas lahan (m2)",
            style: {
                fontSize: '20px',
              color: '#008FFB',
            }
          },
          tooltip: {
            enabled: true
          }
        }
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        },
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40
      }
    },
    series: [{
      name: 'Jenis Tanaman',
      type: 'column',
      data: []
    }],
  }
}

  changePlant(event) {
    const self = this;
    axios
      .get("http://3.1.9.239/analyze", {
        params: {
          jenis_tanaman: event.value
        }
      })
      .then(function(response) {
        let temp = JSON.parse(JSON.stringify(self.state)).series;
        temp[0].data = response.data.luas_tanah;
        temp[0].name = event.value;
        self.setState({
          options: { xaxis: { categories: response.data.past_output_dates } },
          series: temp,
          jenis_tanaman: event.value,
          total_user: response.data.total_user,
          total_lahan: response.data.total_lahan
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  changeCity(event) {
    const self = this;
    if (event.value != "") {
      axios
        .get("http://3.1.9.239/analyzekota", {
          params: {
            jenis_tanaman: self.state.jenis_tanaman,
            kota: event.value
          }
        })
        .then(function(response) {
          let temp = JSON.parse(JSON.stringify(self.state)).series;
          temp[0].data = response.data.luas_tanah;
          self.setState({
            options: { xaxis: { categories: response.data.past_output_dates } },
            series: temp,
            total_user: response.data.total_user,
            total_lahan: response.data.total_lahan
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      axios
        .get("http://3.1.9.239/analyze", {
          params: {
            jenis_tanaman: self.state.jenis_tanaman
          }
        })
        .then(function(response) {
          let temp = JSON.parse(JSON.stringify(self.state)).series;
          temp[0].data = response.data.luas_tanah;
          self.setState({
            options: { xaxis: { categories: response.data.past_output_dates } },
            series: temp,
            jenis_tanaman: event.value,
            total_user: response.data.total_user,
            total_lahan: response.data.total_lahan
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div className="Analyze">
        <div className="row">
          <div className="col-md-9">
            <div className="mixed-chart" style={{width: "100%"}}>
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="line"
                // width="800"
              />
            </div>
          </div>
          <div className="col-md-3">
            <label>Jenis Tanaman :</label>
            <Select options={optionPlant} onChange={e => this.changePlant(e)} />
            <label>Nama Kota :</label>
            <Select options={optionCity} onChange={e => this.changeCity(e)} />
            <br/>
            <div >
              <label>Legenda</label>
              <br/>
              <label>Total luas lahan {this.state.jenis_tanaman}</label>
              <p>{this.state.total_lahan} m<sup>2</sup></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "",
  actions
)(withRouter(ChartLuasTanah));
