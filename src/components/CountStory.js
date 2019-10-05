import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountStory = () => {
  useEffect(() => {
    getTotal();
    getTotalPublish();
    getTotalDraft();
  }, []);

  const [total, setTotal] = useState(0);
  const [publish, setPublish] = useState(0);
  const [draft, setDraft] = useState(0);

  const getTotal = async () => {
    const total = await axios.get('http://localhost:1337/api/v1/stories?count=true');
    setTotal(total.data.data);
  }

  const getTotalPublish = async () => {
    const total = await axios.get('http://localhost:1337/api/v1/stories?count=true&status=publish');
    setPublish(total.data.data);
  }

  const getTotalDraft = async () => {
    const total = await axios.get('http://localhost:1337/api/v1/stories?count=true&status=draft');
    setDraft(total.data.data);
  }

  return (
    <div className="row">
      <div className="col-md">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">All</h5>
            <div className="row">
              <div className="col-sm-4 text-left">
                <i className="fa fa-book fa-custom fa-color-danger"></i>
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
            <h5 className="card-title">Publish</h5>
            <div className="row">
              <div className="col-sm-4 text-left">
                <i className="fa fa-book fa-custom fa-color-primary"></i>
              </div>
              <div className="col-sm-8 text-right">
                <span className="font-weight-bold text-primary font-50">{publish}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Draft</h5>
            <div className="row">
              <div className="col-sm-4 text-left">
                <i className="fa fa-book fa-custom fa-color-info"></i>
              </div>
              <div className="col-sm-8 text-right">
                <span className="font-weight-bold text-info font-50">{draft}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountStory;
