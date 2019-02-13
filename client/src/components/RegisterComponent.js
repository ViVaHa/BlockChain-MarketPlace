import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
export default class Register extends Component {
  constructor(){
      super();
      this.state = {
        email : '',
        name : '',
        password : '',

      }
  }
  onChange = e =>{
    this.setState({[e.target.id] : e.target.value});
  }
  onSubmit = e =>{
    e.preventDefault();
    const object = {
      name : this.state.name,
      email : this.state.email,
      password : this.state.password
    }
    console.log(this.state);
    axios.post('http://localhost:5000/api/users/register', object)
        .then(res => {
          console.log(res.data)
          if(res.status==200){
            this.props.history.push('/login')
          }
        });
  }
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Registration</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name:  </label>
                        <input type="text" className="form-control" id="name"
                        onChange={this.onChange}/>
                    </div>
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
                        <input type="submit" value="Register Yourself" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
