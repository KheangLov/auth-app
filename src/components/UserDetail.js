import React, { Component } from 'react';
import axios from 'axios';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      role: [],   
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
    const { match: { params } } = this.props;
    axios.get(`http://localhost:1337/api/v1/user/${params.id}`)
      .then(res => this.setState({ user: res.data.data[0], role: res.data.data[0].role_id }))
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) this.componentDidMount();
  }

  getCurrentDatetime = () => {
    const date = new Date();
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  handleUpdate = () => {
    document.getElementById('btn_update').classList.add('d-none');
    document.getElementById('btn_edit').classList.remove('d-none');
    document.getElementById('btn_cancel').classList.remove('d-none');
    document.getElementById('role_id').value = 1;
    const inputs = document.getElementsByClassName('form-control');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].removeAttribute('disabled');
      inputs[i].value = '';
    }
  }

  handleCancel = () => {
    document.getElementById('btn_update').classList.remove('d-none');
    document.getElementById('btn_edit').classList.add('d-none');
    document.getElementById('btn_cancel').classList.add('d-none');
    document.getElementById('role_id').value = 1;
    const inputs = document.getElementsByClassName('form-control');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].setAttribute('disabled', 'disabled');
      inputs[i].value = '';
    }
  }

  handleEdit = async e => {
    e.preventDefault();
    const fullname = `${this.state.firstname}${this.state.lastname}`;
    await this.setState({ fullname });
    console.log(this.state);
    await axios.post('http://localhost:1337/api/v1/users', this.state)
      .then(response => console.log(response))
      .catch(error => console.error(error));
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleFocus = e => {
    e.target.value = '';
  }

  handleKeypress = e => {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() { 
    const { user, role } = this.state;
    return (
      <div className="row">
        <div className="col-4">
          <div className="card text-center">
            <img className="card-img-top" src={`/upload/profiles/${user.image !== '' ? user.image : 'no-image.png'}`} alt={user.image !== '' ? user.image : 'no-image.png'} />
            <div className="card-body">
              <h4 className="card-title font-weight-bold text-info">{user.firstname} {user.lastname}</h4>
              <span className="font-weight-light">@{user.lastname}</span>
              <h6 className="font-weight-normal mt-2">
                <i className="fa fa-quote-left"></i> {user.quote} <i className="fa fa-quote-right"></i>
              </h6>
            </div>
            <div className="card-footer">
              <h6 className="">
                About me:
                <br />
                {user.about}
              </h6>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card-header">
              <h2 className="font-weight-bold">User's Profile</h2>
            </div>
            <div className="card-body">
              <form className="mb-0" onSubmit={this.handleEdit}>
                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" className="form-control" id="email" onChange={this.handleChange} value={user.email} disabled />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="role">Role</label>
                      <input type="text" className="form-control" id="role_id" onChange={this.handleChange} value={role.name} disabled />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <input type="text" className="form-control" id="status" onChange={this.handleChange} value={user.status} disabled />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="firstname">Firstname</label>
                      <input type="text" className="form-control" id="firstname" onChange={this.handleChange} value={user.firstname} disabled />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="lastname">Lastname</label>
                      <input type="text" className="form-control" id="lastname" onChange={this.handleChange} value={user.lastname} disabled />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <input type="text" className="form-control" id="gender" onChange={this.handleChange} value={user.gender} disabled />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="dob">DOB</label>
                      <input type="text" className="form-control" id="dob" onChange={this.handleChange} value={user.dob} disabled />
                    </div>
                  </div>
                  <div className="col-12">
                    <div class="form-group">
                      <label htmlFor="address">Address</label>
                      <textarea class="form-control" id="address" rows="3" onChange={this.handleChange} disabled>{user.address}</textarea>
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="form-group">
                      <label htmlFor="city">City</label>
                      <input type="text" class="form-control" id="city" onChange={this.handleChange} value={user.city} disabled />
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="form-group">
                      <label htmlFor="country">Country</label>
                      <input type="text" class="form-control" id="country" onChange={this.handleChange} value={user.country} disabled />
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input type="text" class="form-control" id="phone" onChange={this.handleChange} value={user.phone} disabled />
                    </div>
                  </div>
                  <div className="col-6">
                    <div class="form-group">
                      <label htmlFor="about">About</label>
                      <textarea class="form-control" id="about" rows="3" onChange={this.handleChange} disabled>{user.about}</textarea>
                    </div>
                  </div>
                  <div className="col-6">
                    <div class="form-group">
                      <label htmlFor="quote">Quote</label>
                      <textarea class="form-control" id="quote" rows="3" onChange={this.handleChange} disabled>{user.quote}</textarea>
                    </div>
                  </div>
                  <div className="col-12 text-right">
                    <div className="form-group mb-0">
                      <button id="btn_edit" type="submit" className="btn btn-raised btn-info ml-2 d-none">Edit</button>
                      <button type="button" id="btn_cancel" className="btn btn-raised btn-danger ml-2 d-none" onClick={this.handleCancel}>Cancel</button>
                      <button type="button" id="btn_update" className="btn btn-raised btn-primary" onClick={this.handleUpdate}>Update Profile</button>
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
 
export default UserDetail;