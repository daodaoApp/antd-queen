import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Modal, Button } from 'antd';
import './QnModal.scss';

class QnModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.trigger = this.getTrigger();
  }

  componentDidMount() { }

  componentWillReceiveProps(nextProps) { }

  getTrigger = () => {
    let trigger = null;
    const { triggerType, buttonProps, aProps } = this.props;
    const title = this.props.triggerTitle ? this.props.triggerTitle : this.props.title;

    if (triggerType === 'button') {
      const defaultButtonProps = {
        icon: 'plus',
        type: 'primary',
      };
      const settings = buttonProps || defaultButtonProps;
      trigger = (
        <Button
          onClick={this.handleTriggerClick}
          {...settings}
        >
          {title}
        </Button>);
    } else {
      const settings = aProps;
      trigger = (
        <a
          {...settings}
          onClick={this.handleTriggerClick}
        >
          {title}
        </a>
      );
    }
    return trigger;
  }

  handleTriggerClick = (e) => {
    e.preventDefault();
    if (this.props.isDisableTrigger) {
      return;
    }
    if (typeof this.props.handleOpen === 'function') {
      this.props.handleOpen();
    }
    this.setState({ visible: true });
  }

  handleModalOk = () => {
    const { handleOk, ifNeedSyncVerification } = this.props;

    if (ifNeedSyncVerification) {
      handleOk().then((flag) => {
        this.setState({ visible: flag });
      });
    } else {
      handleOk();
      this.setState({ visible: false });
    }
  }

  handleModalCancel = () => {
    if (typeof this.props.handleCancel === 'function') {
      this.props.handleCancel();
    }
    this.setState({
      visible: false,
    });
  }


  render() {
    const {
      otherProps, className, okText, cancelText, maskClosable, width,
    } = this.props;
    const { display, footer } = otherProps;
    // const childrenWithProps = React.Children.map(this.props.children,
    //   child => React.cloneElement(child, { cancelModal: this.handleModalCancel }));
    return (
      <div className={`${QnModal}${className ? ` ${className}` : ''}`} style={display}>
        {this.trigger}
        <Modal
          className="mainModal"
          title={this.props.title}
          visible={this.state.visible}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
          okText={okText}
          cancelText={cancelText}
          maskClosable={maskClosable}
          closable
          width={width}
          footer={footer}
          {...this.props.otherProps}
        >
          {this.props.children}
        </Modal>

      </div>
    );
  }
}
QnModal.propTypes = {};
QnModal.defaultProps = {
  // 这个title是modal的标题
  title: '打开modal',
  // 触发modal打开的, 可能是button或者a标签
  triggerType: 'button', // |a
  triggerTitle: (<span>打开modal</span>),
  buttonProps: null,
  aProps: null,
  maskClosable: false,
  isDisableTrigger: false,
  otherProps: {},
  handleOk: () => { },
  handleCancel: () => { },
  okText: 'OK',
  cancelText: 'Cancel',
  handleOpen: () => { },
  width: 520,

  // 如果有验证，则验证失败时不能关闭弹框，默认验证失败
  // ifPassVerification: true
  ifNeedSyncVerification: false,
};
export default QnModal;
