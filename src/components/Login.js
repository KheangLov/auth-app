import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    axios.get(`http://localhost:1337/api/v1/user/auth?username=${username}&password=${password}`)
      .then(res => this.setState({ rows: res.data.data.rows.length }))
      .catch(err => console.log(err));
  }

  render() {
    if (localStorage.getItem("isLoggedIn") !== '' && localStorage.getItem("isLoggedIn") === 'true') return (<Redirect to="/home" />);
    const { rows } = this.state;
    if (rows > 0) {
      localStorage.setItem("isLoggedIn", true);
      window.location = "/home";
      return false;
    }

    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-4">
            <div className="card mt-5">
              <div className="card-body">
                <div className="text-center">
                  <i className="fa fa-user font-50 fa-color-primary"></i>
                </div>
                <h5 className="card-title font-weight-bold text-center text-primary">Login</h5>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label for="username" class="bmd-label-floating">Username</label>
                    <input type="text" id="username" name="username" onChange={this.handleChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label for="username" class="bmd-label-floating">Password</label>
                    <input type="password" id="password" name="password" onChange={this.handleChange} className="form-control" />
                  </div>
                  <input className="btn btn-raised btn-primary" id="submit" type="submit" value="Login" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Login;