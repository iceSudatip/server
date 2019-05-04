import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
const URL = 'https://us-central1-client-server-65a8b.cloudfunctions.net/api/api/lipsticks/';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lipsticks: []
    }
  }
  chinjung(){

  }
  componentDidMount() {
    axios.get(URL)
      .then(res => {
        this.setState({ lipsticks: res.data })
        console.log(res.data)
      })
  }
  renderDisplay() {
    return _.map(this.state.lipsticks, lipstick => {
      return (
        <div >
          <li className="list-group-item1">
          <h2>name: {lipstick.brand}</h2>
          
          </li>
          <li className="list-group-item">
            brand: {lipstick.brand}<br/>
          </li>
          <li className="list-group-item">
           id: {lipstick.id}<br/>
          </li>
          <li className="list-group-item">
            price: {lipstick.price}<br/>

          </li>
         <button  >
      
           buy
          </button>
        </div>
      )
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div >
          <AppBar onClick={this.chinjung()} className="AppBar_ice" title="Lipstick" />
          {this.renderDisplay()}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
