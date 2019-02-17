import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
export default class Logout extends Component {
  constructor(){
      super();
  }
  onChange = e =>{
    this.setState({[e.target.id] : e.target.value});
  }
  onSubmit = e =>{
    e.preventDefault();
    var login = localStorage.getItem('login');
    console.log("Success");
    localStorage.setItem('login','');
    this.props.history.push('/login');
    window.location.reload();

  }
    render() {
        return (
          <div style={{marginTop: 10}}>
              <h3>Logout</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <p> Sure you want to logout? </p>
                      <input type="submit" value="Logout" className="btn btn-danger"/>
                  </div>
              </form>
          </div>
        )
    }
}
