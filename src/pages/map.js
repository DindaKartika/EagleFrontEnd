// import React, { Component } from "react";
// // import logo from "./logo.svg";
// import "./../App.css";
// import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
// import MapboxDraw from '@mapbox/mapbox-gl-draw';

// const coordinate = []

// const Map = ReactMapboxGl({
//   accessToken:
//     "pk.eyJ1IjoiZGthcnRpa2EiLCJhIjoiY2p0c2kwdWMwMDd5NTQ1bXBmNXJpbmxtbCJ9.56xqwbYC0XEPtb09NA9Hfg"
// });

// const draw = new MapboxDraw({
//   displayControlsDefault: false,
//   controls: {
//       polygon: true,
//       trash: true
//   }
// });

// class App extends Component {
//   _onClickMap(map, evt, updateArea) {
//     console.log(evt.lngLat);
//     const long = evt.lngLat.lng
//     const lat = evt.lngLat.lat

//     const coord = []
//     coord.push(long)
//     coord.push(lat)

//     coordinate.push(coord)
//     console.log(coordinate)

//     map.addControl(draw);
//     map.on('draw.create', updateArea);
//     map.on('draw.delete', updateArea);
//     map.on('draw.update', updateArea);
//   }

//   updateArea() {
//     var data = draw.getAll();
//     // var answer = document.getElementById('calculated-area');
//     // if (data.features.length > 0) {
//     //   var area = turf.area(data);
//     //   // restrict to area to 2 decimal points
//     //   var rounded_area = Math.round(area * 100) / 100;
//     //   answer.innerHTML = '<p><strong>' + rounded_area + '</strong></p><p>square meters</p>';
//     // } else {
//     //   answer.innerHTML = '';
//     //   if (e.type !== 'draw.delete') alert("Use the draw tools to draw a polygon!");
//     // }
//   }

  
//   render() {
//     return (
//       <div>
//         <Map
//           style="mapbox://styles/mapbox/outdoors-v10"
//           containerStyle={{
//             height: "100vh",
//             width: "100vw",
//             marginTop: 10
//           }}
//           center={[112.63396597896462, -7.97718148341032]}
//           zoom={[12]}
//           onClick={this._onClickMap}
//         />
//       </div>
//     );
//   }
// }

// export default App;




import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

// import "./styles.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZGthcnRpa2EiLCJhIjoiY2p0c2kwdWMwMDd5NTQ1bXBmNXJpbmxtbCJ9.56xqwbYC0XEPtb09NA9Hfg"
});

class App extends Component {
  onDrawCreate = ({ features }) => {
    console.log(features);
  };

  onDrawUpdate = ({ features }) => {
    console.log({ features });
  };

  render() {
    return (
      <div className="App">
        <Map
          style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
        >
          <DrawControl
            position="top-left"
            onDrawCreate={this.onDrawCreate}
            onDrawUpdate={this.onDrawUpdate}
          />
        </Map>
      </div>
    );
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
export default App;
