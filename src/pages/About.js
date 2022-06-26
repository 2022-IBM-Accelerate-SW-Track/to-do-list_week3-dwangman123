import React, { Component } from 'react';
import "./About.css";
import profile from '../assets/profile.jpg';

export default class About extends Component {
  render() {
    return (
      <div>
        <div className = "split left">
          <div className = "centered">
            <img className = "profile_image" src = {profile} alt = "Profile Pic"></img>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Dennis Wang</div>
            <div className="brief_description">
              <ul>
                <li> who i am: swag</li>
                <li> career: dags</li>
                <li> interests: the bag </li>
              </ul>
            </div>
          </div>
        </div>  
        
      </div>
    )
  }
}