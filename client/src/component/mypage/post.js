import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Post extends Component {
  state ={ active: false }

  updateMyPage = state => this.props.MyPage.setState(state);

  onAndOff = on => this.setState({ active: on })

  render = () => {
    const { bundle } = this.props;
    const set = () => {
      this.props.set(bundle);
      this.updateMyPage({ show: true, onStage: 'bundle' });
    };
    return (
      <div>
        <div onMouseOver={() => this.onAndOff(true)} onMouseLeave={() => this.onAndOff(false)}>
          {bundle ? (
            <div
              onClick={() => set()}
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
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  set: bundle => dispatch(actions.getBundle(bundle)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
