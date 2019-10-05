import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountUser = () => {
  useEffect(() => {
    getTotal();
    getTotalAdmin();
    getTotalAuthor();
    getTotalSubscriber();
  }, []);

  const [total, setTotal] = useState(0);
  const [admin, setAdmin] = useState(0);
  const [author, setAuthor] = useState(0);
  const [subscriber, setSubscriber] = useState(0);

  const getTotal = async () => {
    const total = await axios.get('http://localhost:1337/api/v1/users?count=true');
    setTotal(total.data.data);
  }

  const getTotalAdmin = async () => {
    const total = await axios.get('http://localhost:1337/api/v1/users?count=true&role=admin');
    setAdmin(total.data.data);
  }

  const getTotalAuthor = async () => {
    const total = await axios.get('http://localhost:1337/api/v1/users?count=true&role=author');
    setAuthor(total.data.data);
  }

  const getTotalSubscriber = async () => {
    const total = await axios.get('http://localhost:1337/api/v1/users?count=true&role=subscriber');
    setSubscriber(total.data.data);
  }

  return (
    <div className="row">
      <div className="col-md">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">All</h5>
            <div className="row">
              <div className="col-sm-4 text-left">
                <i className="fa fa-user fa-custom fa-color-danger"></i>
              </div>
              <div className="col-sm-8 text-right">
                <span className="font-weight-bold text-danger font-50">{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Admin</h5>
            <div className="row">
              <div className="col-sm-4 text-left">
                <i className="fa fa-user fa-custom fa-color-primary"></i>
              </div>
              <div className="col-sm-8 text-right">
                <span className="font-weight-bold text-primary font-50">{admin}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Author</h5>
            <div className="row">
              <div className="col-sm-4 text-left">
                <i className="fa fa-user fa-custom fa-color-info"></i>
              </div>
              <div className="col-sm-8 text-right">
                <span className="font-weight-bold text-info font-50">{author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Subscriber</h5>
            <div className="row">
              <div className="col-sm-4 text-left">
                <i className="fa fa-user fa-custom fa-color-warning"></i>
              </div>
              <div className="col-sm-8 text-right">
                <span className="font-weight-bold text-warning font-50">{subscriber}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountUser;
