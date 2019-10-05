import React, { Component } from 'react';
import CountUser from './CountUser';
import CountStory from './CountStory';

class Home extends Component {
  render() {
    return (
      <>
        <div className="user-wrapper mb-4">
          <h2 className="font-weight-bold text-dark">Users</h2>
          <hr />
          <CountUser />
        </div>
        <div className="story-wrapper mb-4">
          <h2 className="font-weight-bold text-dark">Stories</h2>
          <hr />
          <CountStory />
        </div>
      </>
    );
  }
}
 
export default Home;