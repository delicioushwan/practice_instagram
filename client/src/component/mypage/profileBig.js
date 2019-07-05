import React, { Component } from 'react';
import { hot } from 'react-hot-loader';


export default hot(module)(class extends Component {
  render = () => {
    return (
      <div className="mypage_top_container_B">
        <div>
          userprofile_picture
        </div>
        <div className="profile_B">
          <div>
            <div>user_name</div>
            <div>edit</div>
          </div>

          <div>
            <ul>
              <li>
                <span>
                  posts
                  <span>number</span>
                </span>
              </li>
              <li>
                <span>
                  following
                  <span>number</span>
                </span>
              </li>
              <li>
                <span>
                  follower
                  <span>number</span>
                </span>
              </li>
            </ul>
          </div>

          <div>
          about
          </div>
        </div>
      </div>
    );
  }
});
