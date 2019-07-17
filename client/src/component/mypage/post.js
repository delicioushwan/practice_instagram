import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

export default hot(module)(class extends Component {
  state ={ active: false }

  updateMyPage = state => this.props.MyPage.setState(state);

  render = () => {
    const { bundle } = this.props;
    return (
      <div onClick={() => this.updateMyPage({ bundle, show: true, onStage: 'bundle' })}>
        <div onMouseOver={() => this.setState({ active: true })} onMouseLeave={() => this.setState({ active: false })}>
          {bundle ? (
            <div className={this.state.active ? 'active' : ''}>
              <div>
                <ul>
                  <li>
                    <span className="heart" />
                    <span>{bundle.likes.length}</span>
                  </li>
                  <li>
                    <span className="bubble_speech" />
                    <span>{bundle.comments.length}</span>
                  </li>
                </ul>
              </div>
              <img src={bundle.pictures[0].pic} alt="pics" />
            </div>
          )
            : null}
        </div>
      </div>
    );
  }
});
