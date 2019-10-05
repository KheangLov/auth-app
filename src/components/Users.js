import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      users: [
        {
          fullname: '',
          image: '',
          email: ''
        },
        {
          fullname: '',
          image: '',
          email: ''
        },
        {
          fullname: '',
          image: '',
          email: ''
        }
      ]
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:1337/api/v1/users?per_page=30`)
      .then(res => this.setState({ users: res.data.data.data }))
      .catch(err => console.log(err));
  }

  handleImgClick = e => {
    this.setState({ img: e.target.alt });
  }

  render() {
    const { users, img } = this.state;
    return (
      <>
        <div className="header-wrap d-flex justify-content-between">
          <h4 className="font-weight-bold text-darks">All Users</h4>
          <Link to="/user/create" className="btn btn-raised btn-dark">Add User</Link>
        </div>
        <hr className="mt-0" />
        <div className="card-columns">
          {users.map(user => (
            <div className="card text-center" key={user.id}>
              <button type="button" class="btn btn-primary p-0" onClick={this.handleImgClick} data-toggle="modal" data-target="#exampleModal">
                <img className="card-img-top img-fluid mx-auto d-block" style={{ width: '100%', height: '200px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} src={`/upload/profiles/${user.image !== '' ? user.image : 'no-image.png'}`} alt={user.image} />
              </button>
              <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-body p-0">
                      <img className="card-img-top position-relative img-fluid mx-auto d-block" src={`/upload/profiles/${img !== '' ? img : 'no-image.png'}`} alt={img} />
                      <button type="button" class="position-absolute close" style={{ top: '0px', right: '5px' }} data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title font-weight-bold">{user.fullname}</h5>
                <p>{user.email}</p>
                <Link to={`/user/detail/${user.id}`} className="btn btn-primary">View</Link>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
 
export default Users;