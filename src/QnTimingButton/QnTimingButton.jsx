import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import { Button } from 'antd';
// import './QnTimingButton.less';

const defaultTime = 3;
class QnTimingButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      loading: this.props.loading,
      countDown: this.props.time,
      showCountDown: false,
      hasFetched: false,
    };
    this.timer = null;
    this.countDown = this.props.time > 0 ? this.props.time : defaultTime;
  }

  componentDidMount() { }

  componentWillReceiveProps(nextProps) { }

  handleCountDown = () => {
    // const step = 1;
    // let { countDown } = this.state;
    // countDown -= 1;
    // if (countDown <= 0) {
    //   clearInterval(this.timer);
    // }
    // this.setState({ countDown });

    this.setState((prevState, props) => {
      if (prevState.countDown - props.step <= 0) {
        clearInterval(this.timer);
        return {
          loading: false,
          showCountDown: false,
          countDown: props.time,
          hasFetched: true,
        };
      }
      return {
        countDown: prevState.countDown - props.step,
        loading: prevState.loading,
      };
    });
  }

  handleClick = () => {
    const { onClick, loading } = this.props;
    if (typeof onClick === 'function') {
      onClick();
    }
    this.setState({
      showCountDown: true,
      loading,
    }, () => {
      this.timer = setInterval(this.handleCountDown, 1000);
    });
  }

  render() {
    const { showCountDown, loading, countDown } = this.state;
    const { isShowCountDown, isButtonStyle } = this.props;
    const btnProps = {
      ...this.props,
      loading,
      onClick: this.handleClick,
    };
    if (!isButtonStyle) {
      return (
        <Fragment>
          {this.props.children({
            hasFetched: this.state.hasFetched,
            handler: this.handleClick,
            showCountDown: this.state.showCountDown,
            countDown: this.state.countDown,
            TextBox: props => (
              <Fragment>
                {props.children}
              </Fragment>
            ),
          })}
        </Fragment>
      );
    }
    return (
      <Button
        {...btnProps}
      >
        {
          this.props.children
        }
        {isShowCountDown && showCountDown ? ` (${countDown})` : null}
      </Button>
    );
  }
}
QnTimingButton.propTypes = {
  loading: propTypes.bool,
  time: propTypes.any,
  onClick: propTypes.func,
  step: propTypes.number,
  isShowCountDown: propTypes.bool,
  isButtonStyle: propTypes.bool,
};
QnTimingButton.defaultProps = {
  // children: '按钮文字',
  loading: true,
  time: defaultTime,
  onClick: () => {

  },
  step: 1,
  isShowCountDown: true,
  isButtonStyle: true, // 是否为button形式的按钮
};
export default QnTimingButton;
