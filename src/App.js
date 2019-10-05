import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/Home';
import Users from './components/Users';
import Stories from './components/Stories';
import StoryDetail from './components/StoryDetail';
import Login from './components/Login';
import UserDetail from './components/UserDetail';
import Footer from './components/layout/Footer';
import CreateUser from './components/CreateUser';
import CreateStory from './components/CreateStory';
import Logout from './components/Logout';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({ path: window.location.pathname });
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.path !== this.state.path) {
      this.componentDidMount();
    }
  }

  render() {
    const { path } = this.state;
    return (
      <>
        <Router>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          {path && path !== '/login' ? <Navbar /> : ''}
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/stories" component={Stories} />
              <Route path="/users" component={Users} />
              <Route path="/story/detail/:id" component={StoryDetail} />
              <Route path="/user/detail/:id" component={UserDetail} />
              <Route path="/user/create" component={CreateUser} />
              <Route path="/story/create" component={CreateStory} />
            </Switch>
          </div>
          {path && path !== '/login' ? <Footer /> : ''}
        </Router>
      </>
    );
  }
}

export default App;
