import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
export default class Login extends Component {
  constructor(){
      super();
      this.state = {
        email : '',
        password : '',

      }
  }
  onChange = e =>{
    this.setState({[e.target.id] : e.target.value});
  }
  onSubmit = e =>{
    e.preventDefault();
    const object = {
      email : this.state.email,
      password : this.state.password
    }
    if(localStorage.getItem('login')==''){
      axios.post('http://localhost:5000/api/users/login', object)
          .then(res => {
            console.log(res.data);
            if(res.status==200){
              console.log("Success");
              localStorage.setItem('login',res.data.email);
              localStorage.setItem('id', res.data.id);
              this.props.history.push('/');
              window.location.reload();
            }
          });
    }

  }
    render() {
        return (
          <div style={{marginTop: 10}}>
              <h3>Login</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>Email ID: </label>
                      <input type="text" className="form-control" id="email"
                      onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                      <label>Password: </label>
                      <input type="password" className="form-control" id="password"
                      onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                      <input type="submit" value="Login" className="btn btn-primary"/>
                  </div>
              </form>
          </div>
        )
    }
}
