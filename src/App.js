import React, { Component } from 'react';
import Routes from 'routes';
import './index.css';
import jwt_decode from 'jwt-decode';
const data = JSON.parse(localStorage.getItem('user'));
const remember = JSON.parse(localStorage.getItem('rember_me'));
if (remember) {
  if (data && data.token) {
    const { token } = data;
    const decoded = jwt_decode(token);
    const { exp } = decoded;
    if (Date.now() + 2 * 60 * 60 * 1000 <= exp * 1000 && token) {
    } else {
      localStorage.clear();
    }
  }
}
class App extends Component {
  render() {
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

export default App;
