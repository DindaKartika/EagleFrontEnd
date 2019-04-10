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
          options: { xaxis: { categories: response.data.past_output_dates } },
          series: temp,
          jenis_tanaman: event.value
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
        .get("http://0.0.0.0:5000/analyzekota", {
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
            series: temp
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      axios
        .get("http://0.0.0.0:5000/analyze", {
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
            jenis_tanaman: event.value
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
          <div className="mixed-chart">
            <label>Jenis Tanaman :</label>
            <Select options={optionPlant} onChange={e => this.changePlant(e)} />
            <label>Nama Kota :</label>
            <Select options={optionCity} onChange={e => this.changeCity(e)} />
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="850"
              height="400"
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
