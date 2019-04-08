import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store";
import Select from "react-select";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Chart from "react-apexcharts";

const optionPlant = [
  { value: "jagung", label: "jagung" },
  { value: "kacang hijau", label: "kacang hijau" },
  { value: "kacang tanah", label: "kacang tanah" },
  { value: "kedelai", label: "kedelai" },
  { value: "padi", label: "padi" },
  { value: "ubi", label: "ubi" },
  { value: "bawang merah", label: "bawang merah" },
  { value: "bawang putih", label: "bawang putih" },
  { value: "cabai", label: "cabai" },
  { value: "kacang panjang", label: "kacang panjang" },
  { value: "kangkung", label: "kangkung" },
  { value: "kentang", label: "kentang" },
  { value: "ketimun", label: "ketimun" },
  { value: "kubis", label: "kubis" },
  { value: "lobak", label: "lobak" },
  { value: "sawi", label: "sawi" },
  { value: "terung", label: "terung" },
  { value: "tomat", label: "tomat" },
  { value: "wortel", label: "wortel" }
];

class ChartLuasTanah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jenis_tanaman: "",
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
      .get("http://0.0.0.0:5000/analyze", {
        params: {
          jenis_tanaman: "wortel"
        }
      })
      .then(function(response) {
        let temp = JSON.parse(JSON.stringify(self.state)).series;
        temp[0].data = response.data.luas_tanah;
        self.setState({
          options: { xaxis: { categories: response.data.dates } },
          series: temp
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  changePlant(event) {
    const self = this;
    axios
      .get("http://0.0.0.0:5000/analyze", {
        params: {
          jenis_tanaman: event.value
        }
      })
      .then(function(response) {
        let temp = JSON.parse(JSON.stringify(self.state)).series;
        temp[0].data = response.data.luas_tanah;
        self.setState({
          options: { xaxis: { categories: response.data.dates } },
          series: temp
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="Analyze">
        <div className="row">
          <div className="mixed-chart">
            <label>Jenis Tanaman :</label>
            <Select options={optionPlant} onChange={e => this.changePlant(e)} />
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="800"
            />
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
