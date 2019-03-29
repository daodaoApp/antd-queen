import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import { Button } from 'antd';
// import './QnTimingButtonImmediate.less';

const defaultTime = 3;
class QnTimingButtonImmediate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
      countDown: this.props.time,
      showCountDown: false,
    };
    this.timer = null;
  }

  componentDidMount() {
    this.setTimer();
  }

  componentWillReceiveProps(nextProps) { }

  handleCountDown = () => {
    this.setState((prevState, props) => {
      if (prevState.countDown - props.step <= 0) {
        clearInterval(this.timer);
        const { endCallBack } = props;
        endCallBack();
        return {
          loading: false,
          showCountDown: false,
          countDown: 0,
        };
      }
      return {
        countDown: prevState.countDown - props.step,
        loading: prevState.loading,
      };
    });
  }

  setTimer = () => {
    const { loading } = this.props;
    if (!this.timer) {
      this.setState({
        showCountDown: true,
        loading,
      }, () => {
        this.timer = setInterval(this.handleCountDown, 1000);
      });
    }
  }

  render() {
    const {
      countDown,
    } = this.state;

    const { handleClick } = this.props;

    return (
      <button
        className="middle-button"
        onClick={handleClick}
      >
        {
          this.props.children
        }
        {` (${countDown})`}
      </button>
    );
  }
}
QnTimingButtonImmediate.propTypes = {
  loading: propTypes.bool,
  time: propTypes.any,
  onClick: propTypes.func,
  step: propTypes.number,
  downCallBack: propTypes.func,
};
QnTimingButtonImmediate.defaultProps = {
  // children: '按钮文字',
  loading: true,
  time: defaultTime,
  step: 1,
  onClick: () => {

  },
  downCallBack: () => {

  },
};
export default QnTimingButtonImmediate;
