import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      created_date: this.getCurrentDatetime(),
      updated_date: this.getCurrentDatetime(),
      vkey: 0,
      verified: 1,
      password_types: 1,
      password_expired_date: '2019/09/30',
      expired: 0,
      status: 'inactive'
    };
  }

  componentDidMount() {
    axios.get('http://localhost:1337/api/v1/roles')
      .then(response => {
        const roles = response.data.data;
        this.setState({ roles });
      })
      .catch(error => console.log(error));
  }

  capitalize = s => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  changeHandler = e => {
    this.setState({ [e.target.id]: e.target.value });
  }

  getCurrentDatetime = () => {
    const date = new Date();
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  submitHandler = async e => {
    e.preventDefault();
    const fullname = `${this.state.firstname}${this.state.lastname}`;
    await this.setState({ fullname });
    console.log(this.state);
    await axios.post('http://localhost:1337/api/v1/users', this.state)
      .then(response => console.log(response))
      .catch(error => console.error(error));
  }

  render() {
    const { roles } = this.state;
    return (
      <div className="row">
        <div className="col-9">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0 font-weight-bold">Create User</h4>
            </div>
            <div className="card-body">
              <form onSubmit={this.submitHandler}>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="firstname">Firstname</label>
                      <input type="text" className="form-control" id="firstname" onChange={this.changeHandler} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="lastname">Lastname</label>
                      <input type="text" className="form-control" id="lastname" onChange={this.changeHandler} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="text" className="form-control" id="email" onChange={this.changeHandler} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" id="password" onChange={this.changeHandler} />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="role_id">Role</label>
                      <select className="form-control" id="role_id" onChange={this.changeHandler}>
                        <option value="0">Please select any role</option>
                        {roles.map(role => (
                          <option value={role.id}>{this.capitalize(role.name)}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <select className="form-control" id="gender" onChange={this.changeHandler}>
                        <option value="">Please select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="dob">DOB</label>
                      <input type="date" className="form-control" id="dob" onChange={this.changeHandler} />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <select className="form-control" id="status">
                        <option value="">Please choose any Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="ban">Ban</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <textarea className="form-control" rows="3" onChange={this.changeHandler}></textarea>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input type="text" className="form-control" id="city" onChange={this.changeHandler} />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="country">Country</label>
                      <input type="text" className="form-control" id="country" onChange={this.changeHandler} />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input type="number" className="form-control" id="phone" onChange={this.changeHandler} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="about">About</label>
                      <textarea className="form-control" rows="3" id="about" onChange={this.changeHandler}></textarea>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="quote">Quote</label>
                      <textarea className="form-control" rows="3" id="quote" onChange={this.changeHandler}></textarea>
                      <div className="text-right btn-wrap mt-5">
                        <Link to="/admin/user" className="btn btn-danger">Cancel</Link>
                        <button type="submit" className="btn btn-primary">Add</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default CreateUser;