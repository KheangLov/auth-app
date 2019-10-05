import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      username: '',
      password: ''
    }

    this.oktaAuth = new OktaAuth({ url: props.baseUrl });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.oktaAuth.signIn({
      username: this.state.username,
      password: this.state.password
    })
    .then(res => this.setState({
      sessionToken: res.sessionToken
    }))
    .catch(err => console.log('Found an error', err));
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  render() {
    if (this.state.sessionToken) {
      this.props.auth.redirect({sessionToken: this.state.sessionToken});
      return null;
    }
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-4">
            <div className="card mt-5">
              <div className="card-body">
                <h5 className="card-title text-center"><strong>Login Form</strong></h5>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Username:</label>
                    <input type="text" className="form-control" id="username" value={this.state.username} onChange={this.handleUsernameChange} placeholder="Enter email" />
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Enter email" />
                  </div>
                  <input className="btn btn-primary" id="submit" type="submit" value="Submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default withAuth(LoginForm);