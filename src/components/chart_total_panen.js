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

class ChartTotalPanen extends Component {
  constructor(props) {
    super(props);
//     this.state = {
//       jenis_tanaman_1: "",
//       jenis_tanaman_2: "",
//       options: {
//         // chart: {
//         //   id: "basic-bar"
//         // },
//         // xaxis: {
//         //   categories: []
//         // }
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
//             text: 'Grafik Perkiraan Panen per Hari (30 Hari Kedepan)',
//             align: 'left'
//         },
//         grid: {
//             row: {
//                 colors: ['#f3f3f3', 'transparent'],
//                 opacity: 0.5
//             },
//         },
//         xaxis: {
//             categories: [],
//         }
//       },
//       series: [
//         {
//           name: "total panen (kg)",
//           // type: "column",
//           data: []
//         },
//         {
//           name: "total panen (kg)",
//           // type: "column",
//           data: []
//         }
//       ]
//     };
//   }
this.state = {
    jenis_tanaman_1: "",
    jenis_tanaman_2: "",
    total_panen_1: 0,
    total_panen_2: 0,
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
            text: "Perkiraan hasil panen (kg)",
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
      name: 'Jenis Tanaman 1',
      type: 'column',
      data: []
    }, {
      name: 'Jenis Tanaman 2',
      type: 'column',
      data: []
    }],
  }
}

changePlant1(event) {
  const self = this;
  axios
    .get("https://api.lahanku.id/analyze", {
      params: {
        jenis_tanaman: event.value
      }
    })
    .then(function(response) {
      let temp = JSON.parse(JSON.stringify(self.state)).series;
      temp[0].data = response.data.avg_panen;
      temp[0].name = event.value;
      self.setState({
        options: { xaxis: { categories: response.data.future_output_dates } },
        series: temp,
        jenis_tanaman_1: event.value,
        total_user: response.data.total_user,
        total_panen_1: response.data.total_panen
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

changePlant2(event) {
  const self = this;
  axios
    .get("https://api.lahanku.id/analyze", {
      params: {
        jenis_tanaman: event.value
      }
    })
    .then(function(response) {
      let temp = JSON.parse(JSON.stringify(self.state)).series;
      temp[1].data = response.data.avg_panen;
      temp[1].name = event.value;
      self.setState({
        options: { xaxis: { categories: response.data.future_output_dates } },
        series: temp,
        jenis_tanaman_2: event.value,
        total_user: response.data.total_user,
        total_panen_2: response.data.total_panen
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
      .get("https://api.lahanku.id/analyze", {
        params: {
          jenis_tanaman: self.state.jenis_tanaman_1,
          kota: event.value
        }
      })
      .then(function(response) {
        let temp = JSON.parse(JSON.stringify(self.state)).series;
        temp[0].data = response.data.avg_panen;
        self.setState({
          options: { xaxis: { categories: response.data.future_output_dates } },
          series: temp,
          total_user: response.data.total_user,
          total_panen_1: response.data.total_panen
        });
      })
      .catch(function(error) {
        console.log(error);
      });

      axios
      .get("https://api.lahanku.id/analyzekota", {
        params: {
          jenis_tanaman: self.state.jenis_tanaman_2,
          kota: event.value
        }
      })
      .then(function(response) {
        let temp = JSON.parse(JSON.stringify(self.state)).series;
        temp[1].data = response.data.avg_panen;
        self.setState({
          options: { xaxis: { categories: response.data.future_output_dates } },
          series: temp,
          total_user: response.data.total_user,
          total_panen_2: response.data.total_panen
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  } else {
    axios
      .get("https://api.lahanku.id/analyzekota", {
        params: {
          jenis_tanaman_1: self.state.jenis_tanaman
        }
      })
      .then(function(response) {
        let temp = JSON.parse(JSON.stringify(self.state)).series;
        temp[0].data = response.data.avg_panen;
        temp[0].name = event.value;
        self.setState({
          options: { xaxis: { categories: response.data.future_output_dates } },
          series: temp,
          jenis_tanaman: event.value,
          total_user: response.data.total_user,
          total_panen_1: response.data.total_panen
        });
      })
      .catch(function(error) {
        console.log(error);
      });

      axios
        .get("https://api.lahanku.id/analyze", {
        params: {
          jenis_tanaman_2: self.state.jenis_tanaman
        }
      })
      .then(function(response) {
        let temp = JSON.parse(JSON.stringify(self.state)).series;
        temp[0].data = response.data.avg_panen;
        temp[0].name = event.value;
        self.setState({
          options: { xaxis: { categories: response.data.future_output_dates } },
          series: temp,
          jenis_tanaman: event.value,
          total_user: response.data.total_user,
          total_panen_2: response.data.total_panen
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
            {/* <label>Jenis Tanaman :</label>
            <Select options={optionPlant} onChange={e => this.changePlant(e)} />
            <label>Nama Kota :</label>
            <Select options={optionCity} onChange={e => this.changeCity(e)} /> */}
            <label>Jenis Tanaman 1:</label>
            <Select options={optionPlant} onChange={e => this.changePlant1(e)} />
            <label>Jenis Tanaman 2:</label>
            <Select options={optionPlant} onChange={e => this.changePlant2(e)} />
            <label>Nama Kota :</label>
            <Select options={optionCity} onChange={e => this.changeCity(e)} />
            <br/>
            <div>
              <label>Legenda</label>
              <br/>
              <label><span>Perkiraan total panen </span>{this.state.jenis_tanaman_1}</label>
              <p>{this.state.total_panen_1} Kg</p>
              <br/>
              <label>Perkiraan total panen {this.state.jenis_tanaman_2}</label>
              <p>{this.state.total_panen_2} Kg</p>
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
)(withRouter(ChartTotalPanen));
