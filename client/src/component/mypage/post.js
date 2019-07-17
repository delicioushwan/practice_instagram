import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

export default hot(module)(class extends Component {
  state ={ active: false }

  updateMyPage = state => this.props.MyPage.setState(state);

  onAndOff = on => this.setState({ active: on })

  render = () => {
    const { bundle } = this.props;
    return (
      <div>
        <div onMouseOver={() => this.onAndOff(true)} onMouseLeave={() => this.onAndOff(false)}>
          {bundle ? (
            <div
              onClick={() => this.updateMyPage({ bundle, show: true, onStage: 'bundle' })}
              className={this.state.active ? 'active' : ''}
            >
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
