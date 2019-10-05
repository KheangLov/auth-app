import React, { Component } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';

class Navbar extends Component {
  render() {
    if (localStorage.getItem("isLoggedIn") !== 'true') return (<Redirect to="/login" />);
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand font-weight-bold" to="/">Auth APP</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink activeClassName="active" className="nav-link" to="/home">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink activeClassName="active" className="nav-link" to="/stories">Stories</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink activeClassName="active" className="nav-link" to="/users">Users</NavLink>
                </li>
                {localStorage.getItem('isLoggedIn') !== '' && localStorage.getItem('isLoggedIn') === 'true' &&
                  <li className="nav-item">
                    <NavLink activeClassName="active" className="nav-link pr-0" to="/logout">Logout</NavLink>
                  </li>
                }
              </ul>
            </div>
          </div>
        </nav>
        <div className="card bg-info text-white mb-4">
          <div className="card-body font-weight-bold">
            <div className="container">
              <h5 className="card-title font-weight-bold">Explore stories</h5>
              <p className="card-text">Choose from dozens of readymade storyworlds covering numerous categories like fantasy</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
 
export default Navbar;