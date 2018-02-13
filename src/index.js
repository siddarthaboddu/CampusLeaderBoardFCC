import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import axios from "axios";
import Table from "react-bootstrap/lib/Table";
import Image from "react-bootstrap/lib/Image";
import "./index.css";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class App extends Component {
  state = {
    top100Days: [],
    top100AllTime: [],
    current: true
  };
  getData(url, stateName) {
    axios.get(url).then(({ data }) => {
      this.setState({ [stateName]: data });
    });
  }

  pointChanged(value) {
    if (this.state.current !== value) {
      this.setState({ current: value });
    }
  }

  componentDidMount() {
    this.getData(
      "https://fcctop100.herokuapp.com/api/fccusers/top/recent",
      "top100Days"
    );
    this.getData(
      "https://fcctop100.herokuapp.com/api/fccusers/top/alltime",
      "top100AllTime"
    );
  }

  render() {
    const { top100Days } = this.state;
    return (
      <div className="App">
        <Table table table-striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Camper Name</th>
              <th
                onClick={event => {
                  this.pointChanged(true);
                }}
              >
                Points in 30 Days
              </th>
              <th
                onClick={event => {
                  this.pointChanged(false);
                }}
              >
                All Time Points
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.current === true &&
              this.state.top100Days.map((row, index) => {
                return (
                  <tr key={row.username}>
                    <td>{index + 1}</td>
                    <td>
                      <a href={`https://www.freecodecamp.org/${row.username}`}>
                        <img src={row.img} className="imgHeight" circle />
                        {row.username}
                      </a>
                    </td>
                    <td>{row.recent}</td>
                    <td>{row.alltime}</td>
                  </tr>
                );
              })}

            {this.state.current === false &&
              this.state.top100AllTime.map((row, index) => {
                return (
                  <tr key={row.username}>
                    <td>{index + 1}</td>
                    <td>
                      <a href={`https://www.freecodecamp.org/${row.username}`}>
                        <img src={row.img} className="imgHeight" circle />
                        {row.username}
                      </a>
                    </td>
                    <td>{row.recent}</td>
                    <td>{row.alltime}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
